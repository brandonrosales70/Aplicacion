// Verificación si hay un usuario en sessionStorage
const loggedInUser = sessionStorage.getItem('user');

if (loggedInUser) {
    const cuentaLink = document.querySelector('nav a[href="login.html"]');
    if (cuentaLink) {
        cuentaLink.textContent = loggedInUser;
    }
}

// Busqueda de numero de seguimiento en localStorage
document.getElementById("track-button").addEventListener("click", function() {
    const trackingNumbers = document.getElementById("tracking-numbers").value.trim();
    const jsonContainer = document.getElementById("json-container");
    const localStorageDetails = document.getElementById("localStorageDetails");
    
    if (trackingNumbers) {
        const quoteData = localStorage.getItem(trackingNumbers);
        if(quoteData){
            const quoteDataJson = JSON.parse(quoteData);
            const key = quoteDataJson.key;
            const originCountry = quoteDataJson.Origen?.pais;
            const originCity = quoteDataJson.Origen?.ciudad;
            const destinationCountry = quoteDataJson.Destino?.pais;
            const destinationCity = quoteDataJson.Destino?.ciudad;
            const weight = quoteDataJson.Dimensiones?.peso;
            const volume = quoteDataJson.Dimensiones?.volumen;
            const serviceType = quoteDataJson.servicio;

            localStorageDetails.innerHTML = `
            <strong>Resultado de Busqueda</strong> <br>
            Key: ${key} <br>
            Origen: ${originCountry} - ${originCity} <br>
            Destino: ${destinationCountry} - ${destinationCity} <br>
            Peso: ${weight} kg<br>
            Volumen: ${volume} cm³<br>
            Tipo de Servicio: ${serviceType}
            `;
            
        } else {
            alert("Key no encontrada en el LOCAL STORAGE");
        }
    } else {
        alert("Por favor, introduce al menos un número de seguimiento.");
    }
});