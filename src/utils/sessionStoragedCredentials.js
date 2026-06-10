export default class sessionStoragedCredentials {

  setEmail(email) {
    sessionStorage.setItem('email', `${email}`);
  }

  deleteCredentials() {
    sessionStorage.removeItem('email');
  }

  get email() {
    return sessionStorage.getItem('email');
  }
}