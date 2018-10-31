let STATE = {};
const RENDER = window.RENDER;
const HTTP = window.HTTP;
const CACHE = window.CACHE;
const MISC = window.MISC;

$(document).ready(onPageLoad);

function onPageLoad() {
  checkUserValidation();
  watchEditBtn();
  watchLogoutBtn();
  toggleHamburgerMenu();

  // Grabs dog owner id from query string, grabs user info from localStorage
  STATE.dogOwnerId = MISC.getQueryStringParam('id');
  STATE.authUser = CACHE.getAuthenticatedUser();

  // Grabs dog owner info based on id provided, displays details
  HTTP.getDogOwnerById({
    dogOwnerId: STATE.dogOwnerId,
    onSuccess: RENDER.renderDogOwnerDetails
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

// If edit button is clicked, load edit page for that specific client
function watchEditBtn() {
  $('#edit-btn').click(event => {
    const queryString = window.location.search;
    window.open(`./dog-edit.html${queryString}`, '_self');
  });
}

// Logs user out when Logout button is clicked
function watchLogoutBtn() {
  $('#logout-btn').click(event => {
    CACHE.deleteAuthenticatedUser();
    window.open('/', '_self');
  });
}

// Toggles hamburger menu on and off
function toggleHamburgerMenu() {
  $('.hamburger-icon').click(event => {
    $('.main-menu-link').toggleClass('toggle-links');
  });
}
