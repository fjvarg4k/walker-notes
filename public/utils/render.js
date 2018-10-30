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
    let notesShorten = dogOwner.notes;
    if (notesShorten.length > 120) {
      notesShorten = `${dogOwner.notes.substring(0, 120)}...`;
    }
    return `
      <div id="dogOwner-card" class="dogOwner-card" dogOwner-id-data="${dogOwner.id}">
        <ul class="client-info">
          <div class="client-header">
            <li class="dogOwner-card-header">${dogOwner.firstName} ${dogOwner.lastName}</li>
            <li><button id="delete-dogOwner-btn" class="delete-btn">Delete</button></li>
          </div>
          <li class="dogOwner-card-dogName">Dog(s): ${dogOwner.dogNames}</li>
          <li class="dogOwner-card-address">Address: ${dogOwner.address}</li>
          <li class="dogOwner-card-notes">Notes: ${notesShorten}</li>
        </ul>
      </div>
    `;
  }
}

// Renders a detailed view of a specific dog walking client's info
function renderDogOwnerDetails(dogOwner) {
  $('main').html(`
    <div id="dogOwner-details" dogOwner-id-data="${dogOwner.id}">
      <ul>
        <li class="dogOwner-card-header"><h3>${dogOwner.firstName} ${dogOwner.lastName}</h3></li>
        <li class="dogOwner-card-dogName">${dogOwner.dogNames}</li>
        <li>${dogOwner.address}</li>
        ${checkforEmptyValues(dogOwner.walkDays)}
        ${checkforEmptyValues(dogOwner.walkTimeRange)}
        ${checkforEmptyValues(dogOwner.phoneNumber)}
        ${checkforEmptyValues(dogOwner.email)}
        <li>${dogOwner.notes}</li>
      </ul>
    </div>
  `);
}

// Checks if some values are empty. If they are, remove from page
function checkforEmptyValues(dogOwnerDetail) {
  if (dogOwnerDetail === 'undefined') {
    return `<li hidden>${dogOwnerDetail}</li>`;
  } else {
    return `<li>${dogOwnerDetail}</li>`;
  }
}

// Renders an editable view of a specific dog walking client's info

function renderEditDogOwnerDetails(dogOwner) {
  $('#edit-client-details').html(`
    <form id="edit-client-form">
      <fieldset>
        <legend>Edit Client Details</legend>
        <label for="firstName-edit-client">
          First Name: <input id="firstName-edit-client" type="text" name="firstName" value=${dogOwner.firstName} required>
        </label>
        <label for="lastName-edit-client">
          Last Name: <input id="lastName-edit-client" type="text" name="lastName" value=${dogOwner.lastName} required>
        </label>
        <label for="dogNames-edit-client">
          Dog Name(s): <textarea id="dogNames-edit-client" name="dogNames" required>${dogOwner.dogNames}</textarea>
        </label>
        <label for="address-edit-client">
          Address: <textarea id="address-edit-client" name="address" required>${dogOwner.address}</textarea
        </label>
        <label for="notes-edit-client">
          Notes: <textarea id="notes-edit-client" row="50" cols="40" name="notes" required>${dogOwner.notes}</textarea>
        </label>
        <label for="walkTimeRange-edit-client">
          Walk Time Range: <input id="walkTimeRange-edit-client" type="text" name="walkTimeRange" value=${dogOwner.walkTimeRange}>
        </label>
        <label for="walkDays-edit-client">
          Days Walk Needed: <input id="walkDays-edit-client" type="text" name="walkDays" value=${dogOwner.walkDays}>
        </label>
        <label for="phoneNumber-edit-client">
          Phone Number: <input id="phoneNumber-edit-client" type="text" name="phoneNumber" value=${dogOwner.phoneNumber}>
        </label>
        <label for="email-edit-client">
          Email: <input id="email-edit-client" type="email" name="email" value=${dogOwner.email}>
        </label>
        <input type="submit" id="submit-edit-client-btn" name="submit-edit-client" value="Save Changes">
        <input type="button" id="cancel-edit-client-btn" onclick="window.location.href='./hub.html'" name="cancel" value="Cancel">
      </fieldset>
    </form>
  `);
}
