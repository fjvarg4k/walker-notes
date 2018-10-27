window.CACHE = {
  getAuthenticatedUser,
  saveAuthenticatedUser,
  deleteAuthenticatedUser
};

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

function saveAuthenticatedUser(user) {
  localStorage.setItem('jwtToken', user.jwtToken);
  localStorage.setItem('userid', user.id);
  localStorage.setItem('username', user.username);
  localStorage.setItem('firstName', user.firstName);
  localStorage.setItem('lastName', user.lastName);
}

function deleteAuthenticatedUser() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userid');
  localStorage.removeItem('username');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
}
