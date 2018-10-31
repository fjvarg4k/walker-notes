window.CACHE = {
  getAuthenticatedUser,
  saveAuthenticatedUser,
  deleteAuthenticatedUser
};

// Grabs the authenticated user data and verifies that it has a jwtToken
function getAuthenticatedUser() {
  const jwtToken = localStorage.getItem('jwtToken');
  const userid = localStorage.getItem('userid');
  const username = localStorage.getItem('username');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');

  if (jwtToken) {
    return {
      jwtToken,
      userid,
      username,
      firstName,
      lastName
    };
  } else {
    return undefined;
  }
}

// Save the authenticated user data to localStorage
function saveAuthenticatedUser(user) {
  localStorage.setItem('jwtToken', user.jwtToken);
  localStorage.setItem('userid', user.id);
  localStorage.setItem('username', user.username);
  localStorage.setItem('firstName', user.firstName);
  localStorage.setItem('lastName', user.lastName);
}

// Deletes authenticated user data from localStorage
function deleteAuthenticatedUser() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userid');
  localStorage.removeItem('username');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
}
