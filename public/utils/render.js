window.RENDER = {
  renderDogOwnersList,
  renderDogOwnerDetails,
  renderEditDogOwnerDetails
};


// Renders a list of a user's current dog walking clients
function renderDogOwnersList(dogOwners) {
  $('#client-info-list').html(dogOwners.map(dogOwnerToHtml));

  // Takes each individual dog owner and displays the requested info
  function dogOwnerToHtml(dogOwner) {
    return `
      <div id="dogOwner-card" dogOwner-id-data="${dogOwner.id}">
        <ul>
          <li class="dogOwner-card-header"><h3>${dogOwner.firstName} ${dogOwner.lastName}
          <button id="edit-dogOwner-btn">Edit</button>
          <button id="delete-dogOwner-btn">Delete</button></h3></li>
          <li class="dogOwner-card-dogName">${dogOwner.dogNames}</li>
          <li class="dogOwner-card-address">${dogOwner.address}</li>
        </ul>
      </div>
    `;
  }
}

// Renders a detailed view of a specific dog walking client's info
function renderDogOwnerDetails(dogOwner) {
  $('#client-info-details').html(`
    <ul>
      <li class="dogOwner-card-header"><h3>${dogOwner.firstName} ${dogOwner.lastName}</h3></li>
      <li class="dogOwner-card-dogName">${dogOwner.dogNames}</li>
      <li>${dogOwner.address}</li>
      ${checkforUndefinedValues(dogOwner.walkDays)}
      ${checkforUndefinedValues(dogOwner.walkTimeRange)}
      ${checkforUndefinedValues(dogOwner.phoneNumber)}
      ${checkforUndefinedValues(dogOwner.email)}
      <li>${dogOwner.notes}</li>
    </ul>
  `);
}

// Checks if some values are undefined. If they are, remove from page
function checkforUndefinedValues(dogOwnerDetail) {
  if (!typeof dogOwnerDetail === 'undefined') {
    return `<li>${dogOwnerDetail}</li>`;
  } else {
    return '';
  }
}

// Renders an editable view of a specific dog walking client's info

function renderEditDogOwnerDetails(dogOwner) {

}
