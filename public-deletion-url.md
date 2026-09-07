# Public account-deletion URL

This guide describes how to publish the HandyPet account-deletion page at a URL such as:

~~~text
https://handypet.app/delete-account
~~~

The page is an authenticated web client for the existing Firebase callable function, requestAccountDeletion. That function already creates the durable deletion job, removes Firestore and Storage data, deletes the Firebase Auth user last, and retries transient failures.

The public page must only authenticate the account owner and submit the request. It must not contain Admin SDK credentials or perform deletion directly.

## 1. Requirements

Before publishing the page, confirm:

- The page is served over HTTPS.
- The production Firebase Web app is registered in the handypet-production project.
- The production Firebase Authentication providers used by HandyPet are enabled.
- The website domain is added to Firebase Authentication authorized domains.
- requestAccountDeletion is deployed in europe-west1.
- The page is linked from the privacy policy and app-store account settings.
- The page does not accept an email address, UID, or arbitrary request ID as proof of ownership.

The Firebase Web configuration is safe to include in browser code. Firebase Admin credentials, service-account JSON files, and private keys are never safe to include.

## 2. Install the Firebase Web SDK

In the website project:

~~~bash
npm install firebase
~~~

The page can be implemented in React, Vue, plain JavaScript, or the website's existing framework. The example below uses framework-neutral JavaScript modules.

## 3. Production Firebase configuration

Create a browser-only configuration file using Firebase Console → Project settings → Your apps → Web app:

~~~js
// firebase-config.js
export const firebaseConfig = {
  apiKey: 'YOUR_PRODUCTION_WEB_API_KEY',
  authDomain: 'handypet-production.firebaseapp.com',
  projectId: 'handypet-production',
  storageBucket: 'handypet-production.firebasestorage.app',
  messagingSenderId: '1020124228886',
  appId: 'YOUR_PRODUCTION_WEB_APP_ID',
};
~~~

Use the production Web app values. Do not copy development configuration into the production deletion page.

## 4. Page implementation

The page needs email/password sign-in, Google sign-in, an irreversible-deletion confirmation checkbox, a submit button, and a success state explaining that deletion is asynchronous.

Example implementation:

~~~js
// delete-account.js
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, 'europe-west1');
const requestAccountDeletion = httpsCallable(
  functions,
  'requestAccountDeletion',
);

const $ = (selector) => document.querySelector(selector);
const signInForm = $('#sign-in-form');
const deletionForm = $('#delete-account-form');
const status = $('#status');

function showStatus(message, isError = false) {
  status.textContent = message;
  status.dataset.error = isError ? 'true' : 'false';
}

function setAuthenticatedState(user) {
  const signedIn = Boolean(user);
  $('#signed-out-panel').hidden = signedIn;
  $('#authenticated-panel').hidden = !signedIn;
  if (signedIn) {
    $('#signed-in-as').textContent = user.email || 'Signed-in account';
  }
}

onAuthStateChanged(auth, setAuthenticatedState);

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showStatus('Signing in…');

  try {
    await signInWithEmailAndPassword(
      auth,
      $('#email').value.trim(),
      $('#password').value,
    );
    $('#password').value = '';
    showStatus('Signed in. Review the deletion information below.');
  } catch (_) {
    showStatus(
      'We could not sign you in. Check your details and try again.',
      true,
    );
  }
});

$('#google-sign-in').addEventListener('click', async () => {
  showStatus('Opening Google sign-in…');

  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    showStatus('Signed in. Review the deletion information below.');
  } catch (_) {
    showStatus(
      'We could not sign you in with Google. Please try again.',
      true,
    );
  }
});

$('#sign-out').addEventListener('click', async () => {
  await signOut(auth);
  showStatus('You have been signed out.');
});

deletionForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    showStatus('Sign in before requesting account deletion.', true);
    return;
  }

  if (!$('#confirm-deletion').checked) {
    showStatus(
      'Confirm that you understand the deletion is permanent.',
      true,
    );
    return;
  }

  const submit = $('#submit-deletion');
  submit.disabled = true;
  showStatus('Confirming your identity…');

  try {
    // The backend accepts only a recent Firebase Auth session.
    const providerIds = user.providerData.map(
      (provider) => provider.providerId,
    );

    if (providerIds.includes('password')) {
      const currentPassword = window.prompt(
        'Enter your current password to confirm account deletion:',
      );
      if (!currentPassword) {
        throw new Error('reauthentication-cancelled');
      }

      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, currentPassword),
      );
    } else {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    }

    showStatus('Submitting your deletion request…');
    await requestAccountDeletion({ requestId: crypto.randomUUID() });

    deletionForm.hidden = true;
    showStatus(
      'Your account-deletion request was accepted. Your HandyPet cloud '
        + 'data and account will be removed by the deletion service. '
        + 'This page can now be closed.',
    );
  } catch (error) {
    if (error?.message === 'reauthentication-cancelled') {
      showStatus('Account deletion was cancelled.', true);
    } else if (error?.code === 'functions/failed-precondition') {
      showStatus(
        'Please sign in again, then retry account deletion.',
        true,
      );
    } else {
      showStatus(
        'We could not submit the deletion request. Please try again.',
        true,
      );
    }
    submit.disabled = false;
  }
});
~~~

Minimal HTML structure:

~~~html
<main>
  <h1>Delete your HandyPet account</h1>
  <p>
    Account deletion permanently removes your HandyPet account, cloud pet
    profiles, health records, reminders, and uploaded documents. This cannot
    be undone.
  </p>

  <section id="signed-out-panel">
    <h2>Sign in to continue</h2>
    <form id="sign-in-form">
      <label>
        Email
        <input id="email" type="email" autocomplete="email" required>
      </label>
      <label>
        Password
        <input id="password" type="password"
               autocomplete="current-password" required>
      </label>
      <button type="submit">Sign in</button>
    </form>
    <button id="google-sign-in" type="button">Continue with Google</button>
  </section>

  <section id="authenticated-panel" hidden>
    <p>Signed in as <strong id="signed-in-as"></strong>.</p>
    <button id="sign-out" type="button">Sign out</button>
    <form id="delete-account-form">
      <label>
        <input id="confirm-deletion" type="checkbox" required>
        I understand that account deletion is permanent and cannot be undone.
      </label>
      <button id="submit-deletion" type="submit">Delete my account</button>
    </form>
  </section>

  <p id="status" role="status" aria-live="polite"></p>
</main>
~~~

Load delete-account.js through the website's normal bundler, or:

~~~html
<script type="module" src="/delete-account.js"></script>
~~~

## 5. Authentication setup

In Firebase Console → Authentication → Sign-in method:

1. Enable Email/Password if HandyPet accounts support passwords.
2. Enable Google if HandyPet accounts support Google sign-in.
3. Add the website's production domain under Authentication → Settings → Authorized domains.
4. Configure the Google OAuth consent screen and production OAuth client if Firebase requests it.

Do not query sign-in providers for an email address before authentication. Offer supported sign-in choices without revealing whether an account exists or which provider it uses.

## 6. Deploy the backend

From the repository, deploy the existing deletion functions to production:

~~~bash
firebase use handypet-production
firebase deploy --only functions:requestAccountDeletion,functions:startAccountDeletionJob,functions:processAccountDeletionJobs
~~~

If these functions are already deployed and unchanged, no backend change is required for the page.

## 7. Publish the page

Publish the page through the website's normal hosting provider at:

~~~text
/delete-account
~~~

Verify:

- The page loads over HTTPS.
- Email/password sign-in works.
- Google sign-in works.
- A stale session is reauthenticated before deletion.
- The callable request reaches europe-west1.
- No Admin SDK credentials are exposed.
- The request creates accountDeletionJobs/{uid}.
- A signed-out user cannot submit a request.
- A second submission safely resumes the same UID-keyed job.

If the website uses Firebase Hosting, add this to firebase.json:

~~~json
{
  "hosting": {
    "public": "public-site",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
~~~

Place the built website in public-site/ and deploy:

~~~bash
firebase deploy --only hosting
~~~

A Firebase Hosting URL can be used if there is no custom domain:

~~~text
https://handypet-production.web.app/delete-account
~~~

## 8. Privacy-policy wording

Replace the placeholder with the final URL:

~~~text
You can permanently delete your HandyPet account from:

Settings → Delete Account

If you cannot access the app, you may request account deletion at:

https://handypet.app/delete-account

You must sign in to verify ownership before submitting a deletion request.
Account deletion permanently removes the account and cloud pet-care data,
including pet profiles, health records, reminders, and uploaded documents.
Deletion is processed asynchronously. Where limited records must be retained
for legal, security, fraud-prevention, or accounting reasons, the applicable
retention period and reason are described in this policy.
~~~

Do not claim that every copy disappears immediately unless backups, logs, analytics, email systems, and third-party processors have also been assessed. Document any narrow legal retention exception explicitly.

## 9. Important implementation notes

- The backend requires auth_time to be no more than ten minutes old. Reauthentication satisfies this requirement.
- The backend accepts a UUID request ID, so crypto.randomUUID() is appropriate.
- The callable returns the initial job state and does not expose a public job-status endpoint. Show “request accepted”, not “deletion completed”.
- Never add a public endpoint that accepts an email and UID and deletes the account.
- Keep account deletion idempotent. Refreshing or submitting twice must resume the same UID-keyed job.
- Add browser tests for signed-out access, successful reauthentication, cancelled reauthentication, callable failure, and successful request submission.

