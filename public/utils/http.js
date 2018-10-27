window.HTTP = {
  signUpUser,
  loginUser,
  createDogOwner,
  getUserClientsInfo,
  getDogOwnerById,
  updateDogOwner,
  deleteDogOwner
};


// Sends inputted data through POST /api/user endpoint
function signUpUser(options) {
  const { userData, onSuccess, onError } = options;
  $.ajax({
    type: 'POST',
    url: '/api/user',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(userData),
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
}

// Sends inputted data through POST /api/auth/login endpoint
function loginUser(options) {
  const { userData, onSuccess, onError } = options;
  $.ajax({
    type: 'POST',
    url: '/api/auth/login',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(userData),
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
}

// Creates a new dog owner using POST /api/owner endpoint
function createDogOwner(options) {
  const { jwtToken, newDogOwner, onSuccess, onError } = options;
  $.ajax({
    type: 'POST',
    url: '/api/owner',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(newDogOwner),
    // Verifies that the user is authorized to create the new dog owner
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError();
      }
    }
  });
}

// Gets a specific user's clients' info using GET /api/owner endpoint
function getUserClientsInfo(options) {
  const { jwtToken, onSuccess, onError } = options;
  $.ajax({
    type: 'GET',
    url: '/api/owner',
    contentType: 'application/json',
    dataType: 'json',
    data: undefined,
    // Verifies that the user is authorized to view the requested info
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
}

// Gets a specific dog owner's info by id using GET /api/owner/:ownerid endpoint
function getDogOwnerById(options) {
  const { dogOwnerId, onSuccess } = options;
  $.getJSON(`/api/owner/${dogOwnerId}`, onSuccess);
}

// Updates a specific dog owner's info by id using PUT /api/owner/:ownerid endpoint
function updateDogOwner(options) {
  const { jwtToken, dogOwnerId, newDogOwner, onSuccess, onError } = options;
  $.ajax({
    type: 'PUT',
    url: `/api/owner/${dogOwnerId}`,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(newDogOwner),
    // Verifies that the user is authorized to update the info
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError();
      }
    }
  });
}

// Deletes a specific dog owner's info by id using DELETE /api/owner/:ownerid endpoint
function deleteDogOwner(options) {
  const { jwtToken, dogOwnerId, onSuccess, onError } = options;
  $.ajax({
    type: 'DELETE',
    url: `/api/owner/${dogOwnerId}`,
    contentType: 'application/json',
    dataType: 'json',
    data: undefined,
    // Verifies that the user is authorized to delete the info
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
}
