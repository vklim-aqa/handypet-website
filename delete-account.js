import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { EmailAuthProvider, GoogleAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, reauthenticateWithPopup, signInWithEmailAndPassword, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
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
    await signInWithPopup(auth, new GoogleAuthProvider());
    showStatus('Signed in. Review the deletion information below.');
  } catch (_) {
    showStatus('We could not sign you in with Google. Please try again.', true);
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
  showStatus('Confirming your identity…');
  try {
    const providerIds = user.providerData.map((provider) => provider.providerId);
    if (providerIds.includes('password')) {
      const currentPassword = window.prompt('Enter your current password to confirm account deletion:');
      if (!currentPassword) throw new Error('reauthentication-cancelled');
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
    } else {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    }
    showStatus('Submitting your deletion request…');
    await requestAccountDeletion({ requestId: crypto.randomUUID() });
    deletionForm.hidden = true;
    showStatus('Your account-deletion request was accepted. Your HandyPet cloud data and account will be removed by the deletion service. This page can now be closed.');
  } catch (error) {
    if (error?.message === 'reauthentication-cancelled') showStatus('Account deletion was cancelled.', true);
    else showStatus(deletionErrorMessage(error), true);
    submit.disabled = false;
  }
});
