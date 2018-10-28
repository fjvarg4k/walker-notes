let STATE = {};
const RENDER = window.RENDER;
const HTTP = window.HTTP;
const CACHE = window.CACHE;
const MISC = window.MISC;

$(document).ready(onPageLoad);

function onPageLoad() {
  checkUserValidation();
  watchLogoutBtn()

  STATE.dogOwnerId = MISC.getQueryStringParam('id');
  STATE.authUser = CACHE.getAuthenticatedUser();

  HTTP.getDogOwnerById({
    dogOwnerId: STATE.dogOwnerId,
    onSuccess: RENDER.renderEditDogOwnerDetails
  });
}

// Check if the user has authorization to view this page
function checkUserValidation() {
  const authUser = CACHE.getAuthenticatedUser();
  if (!authUser) {
    $('body').html('You are not authorized to view this page.');
    window.open('/', '_self');
  }
}

// Logs user out when Logout button is clicked
function watchLogoutBtn() {
  $('#logout-btn').click(event => {
    CACHE.deleteAuthenticatedUser();
    window.open('/', '_self');
  });
}
