// Verificación si hay un usuario en sessionStorage
const loggedInUser = sessionStorage.getItem('user');

if (loggedInUser) {
    const cuentaLink = document.querySelector('nav a[href="login.html"]');
    if (cuentaLink) {
        cuentaLink.textContent = loggedInUser;
    }
}