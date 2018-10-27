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
  // renderDogOwnersList();
  // renderDogOwnerDetails(),
  // renderEditDogOwnerDetails();

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

// // Renders a detailed view of a specific dog walking client's info
// function renderDogOwnerDetails(dogOwner) {
//   $('#dogOwner-details').html(`
//     <ul>
//       <li class="dogOwner-card-header"><h3>${dogOwner.firstName} ${dogOwner.lastName}
//       <button id="edit-dogOwner-btn">Edit</button>
//       <button id="delete-dogOwner-btn">Delete</button></h3></li>
//       <li class="dogOwner-card-dogName">${dogOwner.dogNames}</li>
//       <li class="dogOwner-card-address">${dogOwner.address}</li>
//       <li class="dogOwner-card-walkDays">${dogOwner.walkDays}</li>
//       <li class="dogOwner-card-walkTimeRange">${dogOwner.walkTimeRange}</li>
//       <li class="dogOwner-card-phoneNumber">${dogOwner.phoneNumber}</li>
//       <li class="dogOwner-card-email">${dogOwner.email}</li>
//       <li class="dogOwner-card-notes">${dogOwner.notes}</li>
//     </ul>
//   `);
// }
//
// // Renders an editable view of a specific dog walking client's info
//
// function renderEditDogOwnerDetails(dogOwner) {
//
// }
