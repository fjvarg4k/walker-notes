let STATE = {};
const CACHE = window.CACHE;
const HTTP = window.HTTP;
const RENDER = window.RENDER;

$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthUI();
}

function updateAuthUI() {
  const authUser = CACHE.getAuthenticatedUser();
  if (authUser) {
    STATE.authUser = authUser;
    $('#authenticated-menu').removeAttr('hidden');
  } else {
    $('#unauthenticated-menu').removeAttr('hidden');
  }
}
