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
          <div class="row client-header">
            <div class="col-3">
              <li class="dogOwner-card-header dogOwner-name">${dogOwner.firstName} ${dogOwner.lastName}</li>
            </div>
            <div class="col-3"
              <li><button id="delete-dogOwner-btn" class="delete-btn">Delete</button></li>
            </div>
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
      <ul class="client-details">
        <li class="dogOwner-card-header"><h3>${dogOwner.firstName} ${dogOwner.lastName}</h3></li>
        <li class="dogOwner-card-dogName">Dog(s): ${dogOwner.dogNames}</li>
        <li>Address: ${dogOwner.address}</li>
        <li>Days Walk Needed: ${checkforEmptyValues(dogOwner.walkDays)}</li>
        <li>Walk Time Window: ${checkforEmptyValues(dogOwner.walkTimeRange)}</li>
        <li>Phone Number: ${checkforEmptyValues(dogOwner.phoneNumber)}</li>
        <li>Email: ${checkforEmptyValues(dogOwner.email)}</li>
        <li>Notes: ${dogOwner.notes}</li>
      </ul>
    </div>
  `);
}

// Checks if some values are empty. If they are, remove from page
function checkforEmptyValues(dogOwnerDetail) {
  if (dogOwnerDetail === 'undefined') {
    return '';
  } else {
    return dogOwnerDetail;
  }
}

// Renders an editable view of a specific dog walking client's info
function renderEditDogOwnerDetails(dogOwner) {
  $('#edit-client-details').html(`
    <form id="edit-client-form">
      <fieldset>
        <legend>Edit Client Details</legend>
        <div class="row">
          <div class="col-3">
            <label for="firstName-edit-client">
              First Name:
            </label>
          </div>
          <div class="col-9">
            <input id="firstName-edit-client" class="form-input" type="text" name="firstName" value=${dogOwner.firstName} required>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="lastName-edit-client">
              Last Name:
            </label>
          </div>
          <div class="col-9">
            <input id="lastName-edit-client" class="form-input" type="text" name="lastName" value=${dogOwner.lastName} required>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="dogNames-edit-client">
              Dog Name(s):
            </label>
          </div>
          <div class="col-9">
            <textarea id="dogNames-edit-client" class="form-input" name="dogNames" required>${dogOwner.dogNames}</textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="address-edit-client">
              Address:
            </label>
          </div>
          <div class="col-9">
            <textarea id="address-edit-client" class="form-input" name="address" required>${dogOwner.address}</textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="notes-edit-client">
              Notes:
            </label>
          </div>
          <div class="col-9">
            <textarea id="notes-edit-client" class="form-input" name="notes" required>${dogOwner.notes}</textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="walkTimeRange-edit-client">
              Walk Time Range:
            </label>
          </div>
          <div class="col-9">
            <input id="walkTimeRange-edit-client" class="form-input" type="text" name="walkTimeRange" value="${dogOwner.walkTimeRange}">
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="walkDays-edit-client">
              Days Walk Needed:
            </label>
          </div>
          <div class="col-9">
            <input id="walkDays-edit-client" class="form-input" type="text" name="walkDays" value="${dogOwner.walkDays}">
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="phoneNumber-edit-client">
              Phone Number:
            </label>
          </div>
          <div class="col-9">
            <input id="phoneNumber-edit-client" class="form-input" type="text" name="phoneNumber" value="${dogOwner.phoneNumber}">
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="email-edit-client">
              Email:
            </label>
          </div>
          <div class="col-9">
            <input id="email-edit-client" class="form-input" type="email" name="email" value=${dogOwner.email}>
          </div>
        </div>
        <div class="center-btns">
          <input type="submit" id="submit-edit-client-btn" class="edit-client-btn" name="submit-edit-client" value="Save Changes">
          <input type="button" id="cancel-edit-client-btn" class="edit-client-btn cancel-btn" onclick="window.location.href='./hub.html'" name="cancel" value="Cancel">
        </div>
      </fieldset>
    </form>
  `);
}
