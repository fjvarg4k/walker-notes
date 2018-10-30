let STATE = {};
const CACHE = window.CACHE;
const HTTP = window.HTTP;
const RENDER = window.RENDER;

$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthUI();
  watchLogoutBtn();
  toggleHamburgerMenu();
}

function updateAuthUI() {
  const authUser = CACHE.getAuthenticatedUser();
  if (authUser) {
    STATE.authUser = authUser;
    $('#authenticated-menu').css('display', 'block');
  } else {
    $('#unauthenticated-menu').css('display', 'block');
  }
}

// Logs user out when Logout button is clicked
function watchLogoutBtn() {
  $('#logout-btn').click(event => {
    CACHE.deleteAuthenticatedUser();
    window.open('/', '_self');
  });
}

function toggleHamburgerMenu() {
  $('.hamburger-icon').click(event => {
    $('.main-menu-link').toggleClass('toggle-links');
  });
}
