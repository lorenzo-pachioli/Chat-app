export default class sessionStoragedCredentials {

  setEmail(email) {
    sessionStorage.setItem('email', `${email}`);
  }

  setPassword(pass) {
    sessionStorage.setItem('password', `${pass}`);
  }

  deleteCredentials() {
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('password', '');
  }

  get email() {
    return sessionStorage.getItem('email');
  }

  get password() {
    return sessionStorage.getItem('password');
  }
}