export default class sessionStoragedCredentials {
  credentials = {
    email: '',
    password: ''
  }

  setCredentialsEmail(email) {
    sessionStorage.setItem('email', `${email}`);
  }

  setCredentialsPassword(password) {
    sessionStorage.setItem('password', `${password}`);
  }

  deleteCredentials() {
    this.credentials.email = sessionStorage.setItem('email', '');
    this.credentials.password = sessionStorage.setItem('password', '');
  }

  get Credentials() {
    this.credentials.email = sessionStorage.getItem('email');
    this.credentials.password = sessionStorage.getItem('password');
    return this.credentials;
  }
}