let STATE = {};
const RENDER = window.RENDER;
const HTTP = window.HTTP;
const CACHE = window.CACHE;

$(document).ready(onPageLoad);

function onPageLoad() {
  checkUserValidation();
  watchLogoutBtn();
  renderUserDetails();
  updateAuthUI();
  watchDogOwnerCard();
  watchDeleteBtn();

  if (STATE.authUser) {
    HTTP.getUserClientsInfo({
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: RENDER.renderDogOwnersList
    });
  }
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

// Renders the requested user details
function renderUserDetails() {
  const firstName = localStorage.getItem('firstName');
  return $('nav h1').after(`<h2>Hello ${firstName}</h2>`);
}

// Grabs user's authentication info from local storage and adds it to STATE
function updateAuthUI() {
  const authUser = CACHE.getAuthenticatedUser();
  STATE.authUser = authUser;
}

// If a dog owner card is clicked, load detailed page for that specific owner
function watchDogOwnerCard() {
  $('#client-info-list').on('click', '#dogOwner-card', event => {
    const dogOwnerId = $(event.currentTarget).attr('dogOwner-id-data');
    window.open(`./dog-details.html?id=${dogOwnerId}`, '_self');
  });
}

// If delete btn is clicked, delete specific client's info
function watchDeleteBtn() {
  $('#client-info-list').on('click', '#delete-dogOwner-btn', event => {
    event.stopImmediatePropagation();
    const dogOwnerId = $(event.currentTarget).closest('#dogOwner-card').attr('dogOwner-id-data');
    const confirmDelete = confirm('Are you sure you want to delete this?');
    if (confirmDelete) {
      HTTP.deleteDogOwner({
        dogOwnerId: dogOwnerId,
        jwtToken: STATE.authUser.jwtToken,
        onSuccess: () => {
          HTTP.getUserClientsInfo({
            jwtToken: STATE.authUser.jwtToken,
            onSuccess: RENDER.renderDogOwnersList
          });
        }
      });
    }
  })
}
