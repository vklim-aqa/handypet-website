import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { EmailAuthProvider, GoogleAuthProvider, deleteUser, getAdditionalUserInfo, getAuth, getIdTokenResult, onAuthStateChanged, reauthenticateWithCredential, reauthenticateWithPopup, signInWithEmailAndPassword, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-functions.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, 'europe-west1');
const requestAccountDeletion = httpsCallable(functions, 'requestAccountDeletion');
const $ = (selector) => document.querySelector(selector);
const signInForm = $('#sign-in-form');
const deletionForm = $('#delete-account-form');
const status = $('#status');
const reauthModal = $('#reauth-modal');
const reauthForm = $('#reauth-form');
const reauthPassword = $('#reauth-password');
const successPanel = $('#success-panel');
let deletionCompleted = false;

function createGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return provider;
}

function requestPasswordReauthentication() {
  return new Promise((resolve, reject) => {
    reauthModal.hidden = false;
    reauthPassword.value = '';
    reauthPassword.focus();

    const finish = (callback) => {
      reauthModal.hidden = true;
      reauthForm.removeEventListener('submit', submit);
      $('#cancel-reauth').removeEventListener('click', cancel);
      reauthPassword.value = '';
      callback();
    };
    const submit = (event) => {
      event.preventDefault();
      const password = reauthPassword.value;
      if (password) finish(() => resolve(password));
    };
    const cancel = () => finish(() => reject(new Error('reauthentication-cancelled')));
    reauthForm.addEventListener('submit', submit);
    $('#cancel-reauth').addEventListener('click', cancel);
  });
}

async function reauthenticateIfNeeded(user) {
  const tokenResult = await getIdTokenResult(user);
  const authTime = Number(tokenResult.claims.auth_time) * 1000;
  const tenMinutes = 1 * 60 * 1000;
  const recentlyAuthenticated = Number.isFinite(authTime) && Date.now() - authTime < tenMinutes;
  if (recentlyAuthenticated) return;

  const providerIds = user.providerData.map((provider) => provider.providerId);
  if (providerIds.includes('password')) {
    const currentPassword = await requestPasswordReauthentication();
    await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
  } else {
    await reauthenticateWithPopup(user, createGoogleProvider());
  }
}

function deletionErrorMessage(error) {
  console.error('Account deletion request failed:', {
    code: error?.code,
    message: error?.message,
    details: error?.details,
  });

  switch (error?.code) {
    case 'functions/unauthenticated':
      return 'Your sign-in session has expired. Sign in again, then retry account deletion.';
    case 'functions/failed-precondition':
      return 'Please sign in again, then retry account deletion.';
    case 'functions/not-found':
      return 'The account-deletion service is not available yet. Please contact HandyPet support.';
    case 'functions/permission-denied':
      return 'This account is not permitted to submit a deletion request. Please contact HandyPet support.';
    case 'functions/unavailable':
    case 'functions/deadline-exceeded':
      return 'The account-deletion service is temporarily unavailable. Please try again in a few minutes.';
    case 'functions/internal':
      return 'The account-deletion service encountered an error. Please try again later or contact HandyPet support.';
    default:
      return 'We could not submit the deletion request. Please try again.';
  }
}

function showStatus(message, isError = false) {
  status.textContent = message;
  status.dataset.error = isError ? 'true' : 'false';
}

function setAuthenticatedState(user) {
  if (deletionCompleted) {
    $('#signed-out-panel').hidden = true;
    $('#authenticated-panel').hidden = true;
    return;
  }
  const signedIn = Boolean(user);
  $('#signed-out-panel').hidden = signedIn;
  $('#authenticated-panel').hidden = !signedIn;
  if (signedIn) $('#signed-in-as').textContent = user.email || 'Signed-in account';
}

onAuthStateChanged(auth, setAuthenticatedState);

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showStatus('Signing in…');
  try {
    await signInWithEmailAndPassword(auth, $('#email').value.trim(), $('#password').value);
    $('#password').value = '';
    showStatus('Signed in. Review the deletion information below.');
  } catch (_) {
    showStatus('We could not sign you in. Check your details and try again.', true);
  }
});

$('#google-sign-in').addEventListener('click', async () => {
  showStatus('Opening Google sign-in…');
  try {
    const result = await signInWithPopup(auth, createGoogleProvider());
    const additionalUserInfo = getAdditionalUserInfo(result);
    if (additionalUserInfo?.isNewUser) {
      try {
        await deleteUser(result.user);
      } catch (cleanupError) {
        await signOut(auth);
        throw cleanupError;
      }
      showStatus('No HandyPet account exists for this Google account. Create an account in the HandyPet app first.', true);
      return;
    }
    showStatus('Signed in. Review the deletion information below.');
  } catch (error) {
    if (error?.code === 'auth/user-token-expired' || error?.code === 'auth/requires-recent-login') {
      showStatus('We could not verify this Google account. Please try again.', true);
    } else {
      showStatus('We could not sign you in with Google. Please try again.', true);
    }
  }
});

$('#sign-out').addEventListener('click', async () => {
  await signOut(auth);
  showStatus('You have been signed out.');
});

deletionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (!user) return showStatus('Sign in before requesting account deletion.', true);
  if (!$('#confirm-deletion').checked) return showStatus('Confirm that you understand the deletion is permanent.', true);

  const submit = $('#submit-deletion');
  submit.disabled = true;
  try {
    showStatus('Checking your sign-in session…');
    await reauthenticateIfNeeded(user);
    showStatus('Submitting your deletion request…');
    await requestAccountDeletion({ requestId: crypto.randomUUID() });
    deletionForm.hidden = true;
    try {
      await signOut(auth);
      deletionCompleted = true;
      setAuthenticatedState(null);
      status.hidden = true;
      successPanel.hidden = false;
    } catch (signOutError) {
      console.error('Account deletion was accepted, but sign-out failed:', signOutError);
      showStatus('Your account-deletion request was accepted, but we could not sign you out automatically. Please click Sign out now.', true);
      $('#authenticated-panel').hidden = false;
    }
  } catch (error) {
    if (error?.message === 'reauthentication-cancelled') showStatus('Account deletion was cancelled.', true);
    else showStatus(deletionErrorMessage(error), true);
    submit.disabled = false;
  }
});
