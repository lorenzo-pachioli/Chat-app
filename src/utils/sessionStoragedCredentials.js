export default class sessionStoragedCredentials {

  setEmail(email) {
    sessionStorage.setItem('email', `${email}`);
  }

  setPassword(pass) {
    sessionStorage.setItem('password', `${pass}`);
  }

  deleteCredentials() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
  }

  get email() {
    return sessionStorage.getItem('email');
  }

  get password() {
    return sessionStorage.getItem('password');
  }
}