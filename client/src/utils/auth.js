import decode from 'jwt-decode';

class AuthService {
    // retreive data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is still logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // Check if token is expired
    isTokenExpired(token) {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
            return true;
          } else return false;
        } catch (err) {
          return false;
        }
      }

    // retrieve token from localstorage
    getToken() {
        // Retrieves the user token from localstorage
        return localStorage.getItem('id_token');
    }

    // set token to localstorage and reload page to homepage
    login(idToken) {
        // Saves user token to localstorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localstorage and force logout with reload
    logout() {
        // CLear token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }

}






export default new AuthService();