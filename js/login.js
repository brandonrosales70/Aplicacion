// Elementos del DOM
const title = document.getElementById('title');
const nameInput = document.getElementById('nameInput');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');

// Cambiar entre Registro y Login
signUpBtn.addEventListener('click', () => {
    title.textContent = "Registro";
    nameInput.style.display = "block";
    signInBtn.classList.add("disable");
    signUpBtn.classList.remove("disable");
    toggleActionButtons("register");
});

signInBtn.addEventListener('click', () => {
    title.textContent = "Login";
    nameInput.style.display = "none";
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove("disable");
    toggleActionButtons("login");
});

// Alternar visibilidad de los botones de acción
function toggleActionButtons(mode) {
    if (mode === "register") {
        registerBtn.classList.remove("hidden");
        loginBtn.classList.add("hidden");
    } else if (mode === "login") {
        registerBtn.classList.add("hidden");
        loginBtn.classList.remove("hidden");
    }
}

// Función para registrar un usuario
function registerUser() {
    const user = username.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (user && userEmail && userPassword) {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.some(u => u.email === userEmail);

        if (userExists) {
            alert("El correo ya está registrado. Usa otro o inicia sesión.");
        } else {
            existingUsers.push({ username: user, email: userEmail, password: userPassword });
            localStorage.setItem('users', JSON.stringify(existingUsers));
            alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
            resetForm();
        }
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Función para iniciar sesión
function loginUser() {
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (userEmail && userPassword) {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(u => u.email === userEmail && u.password === userPassword);

        if (user) {
            // Guardar el usuario en sessionStorage
            sessionStorage.setItem("user", user.username);

            alert(`¡Bienvenido, ${user.username}!`);
            window.location.href = "index.html"; // Redirigir a la página principal
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Restablecer formulario
function resetForm() {
    username.value = '';
    email.value = '';
    password.value = '';
}

// Asociar eventos a los botones de acción
registerBtn.addEventListener('click', registerUser);
loginBtn.addEventListener('click', loginUser);