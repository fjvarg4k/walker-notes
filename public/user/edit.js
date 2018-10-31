let STATE = {};
const RENDER = window.RENDER;
const HTTP = window.HTTP;
const CACHE = window.CACHE;
const MISC = window.MISC;

$(document).ready(onPageLoad);

function onPageLoad() {
  checkUserValidation();
  watchLogoutBtn()
  watchEditForm();
  toggleHamburgerMenu();

  // Grabs dog owner id from query string, grabs user info from localStorage
  STATE.dogOwnerId = MISC.getQueryStringParam('id');
  STATE.authUser = CACHE.getAuthenticatedUser();

  // Grabs dog owner info based on id provided, displays details
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

// Waits for edit form to be submitted, saves the provided data
function watchEditForm() {
  $('#edit-client-details').on('submit', '#edit-client-form', event => {
    event.preventDefault();
    const newDogOwner = {
      firstName: $('#firstName-edit-client').val(),
      lastName: $('#lastName-edit-client').val(),
      dogNames: $('#dogNames-edit-client').val(),
      address: $('#address-edit-client').val(),
      notes: $('#notes-edit-client').val(),
      walkTimeRange: $('#walkTimeRange-edit-client').val(),
      walkDays: $('#walkDays-edit-client').val(),
      phoneNumber: $('#phoneNumber-edit-client').val(),
      email: $('#email-edit-client').val()
    };

    // Updates dog owner info based on provided data
    HTTP.updateDogOwner({
      dogOwnerId: STATE.dogOwnerId,
      newDogOwner: newDogOwner,
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: owner => {
        alert('Changes saved successfully.');
        window.open(`/user/dog-details.html?id=${STATE.dogOwnerId}`, '_self');
      },
      onError: err => {
        $('#error-message').html(`
          <p>There was an issue processing your request, please try again later.</p>
        `);
      }
    });
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
