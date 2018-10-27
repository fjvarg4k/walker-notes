let STATE = {};
const RENDER = window.RENDER;
const HTTP = window.HTTP;
const CACHE = window.CACHE;

$(document).ready(onPageLoad);

function onPageLoad() {
  checkUserValidation();
  watchCreationForm();

  STATE.authUser = CACHE.getAuthenticatedUser();
}

// Check if the user has authorization to view this page
function checkUserValidation() {
  const authUser = CACHE.getAuthenticatedUser();
  if (!authUser) {
    $('body').html('You are not authorized to view this page.');
    window.open('/', '_self');
  }
}

function watchCreationForm() {
  $('#new-client-form').submit(event => {
    event.preventDefault();
    const newDogOwner = {
      firstName: $('#firstName-new-client').val(),
      lastName: $('#lastName-new-client').val(),
      dogNames: $('#dogNames-new-client').val(),
      address: $('#address-new-client').val(),
      notes: $('#notes-new-client').val(),
      walkTimeRange: $('#walkTimeRange-new-client').val(),
      walkDays: $('#walkDays-new-client').val(),
      phoneNumber: $('#phoneNumber-new-client').val(),
      email: $('#email-new-client').val()
    };

    HTTP.createDogOwner({
      jwtToken: STATE.authUser.jwtToken,
      newDogOwner: newDogOwner,
      onSuccess: owner => {
        alert('New Client added successfully.');
        window.open('/user/hub.html', '_self');
      },
      onError: err => {
        $('#error-message').html(`
          <p>There was an issue processing your request, please try again later.</p>
        `);
        console.error(err);
      }
    });
  });
}
