// Mostrar el modal cuando la página se haya cargado y el ancho sea mayor a 720px
document.addEventListener("DOMContentLoaded", function () {
if (window.innerWidth > 720) {
      var myModal = new bootstrap.Modal(document.getElementById('customModal'));
      myModal.show();
    }
});

// Declaración precios base para cada ciudad
const citiesByCountry = {
    "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
    "Bolivia": ["La Paz", "Santa Cruz", "Cochabamba", "Sucre", "Oruro"],
    "Brasil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
    "Chile": ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta"],
    "Colombia": ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
    "Ecuador": ["Quito", "Guayaquil", "Cuenca", "Ambato", "Manta"],
    "Paraguay": ["Asunción", "Ciudad del Este", "San Lorenzo", "Luque", "Encarnación"],
    "Perú": ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco"],
    "Uruguay": ["Montevideo", "Salto", "Paysandú", "Las Piedras", "Rivera"],
    "Venezuela": ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay"]
};

// Declaración precios base para cada ciudad
const cityPrices = {
    "Argentina": { "Buenos Aires": 50, "Córdoba": 45, "Rosario": 40, "Mendoza": 60, "La Plata": 55 },
    "Bolivia": { "La Paz": 70, "Santa Cruz": 65, "Cochabamba": 60, "Sucre": 75, "Oruro": 55 },
    "Brasil": { "São Paulo": 90, "Rio de Janeiro": 85, "Brasília": 80, "Salvador": 95, "Fortaleza": 100 },
    "Chile": { "Santiago": 55, "Valparaíso": 50, "Concepción": 60, "La Serena": 65, "Antofagasta": 70 },
    "Colombia": { "Bogotá": 60, "Medellín": 55, "Cali": 50, "Barranquilla": 65, "Cartagena": 70 },
    "Ecuador": { "Quito": 65, "Guayaquil": 60, "Cuenca": 55, "Ambato": 50, "Manta": 75 },
    "Paraguay": { "Asunción": 55, "Ciudad del Este": 50, "San Lorenzo": 45, "Luque": 60, "Encarnación": 65 },
    "Perú": { "Lima": 60, "Arequipa": 55, "Trujillo": 50, "Chiclayo": 65, "Cusco": 70 },
    "Uruguay": { "Montevideo": 55, "Salto": 50, "Paysandú": 45, "Las Piedras": 60, "Rivera": 65 },
    "Venezuela": { "Caracas": 75, "Maracaibo": 70, "Valencia": 65, "Barquisimeto": 60, "Maracay": 55 }
};

// Funcion para la selección de Ciudades
function updateCities(type) {
    const countrySelect = document.getElementById(type + 'Country');
    const citySelect = document.getElementById(type + 'City');
    const selectedCountry = countrySelect.value;

    // Limpieza de las opciones de ciudad
    citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';

    // Lleado de las opciones de ciudad basadas en el país seleccionado
    if (citiesByCountry[selectedCountry]) {
        citiesByCountry[selectedCountry].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.text = `${city}`;
            citySelect.appendChild(option);
        });
    }
}

// Función para el calculo de la cotización y muestra del precio base
function calculateQuote() {
    const originCountry = document.getElementById("originCountry").value;
    const originCity = document.getElementById("originCity").value;
    const destinationCountry = document.getElementById("destinationCountry").value;
    const destinationCity = document.getElementById("destinationCity").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const serviceType = document.getElementById("serviceType").value;

    if (!originCity || !destinationCity) {
        alert("Seleccione las ciudades de origen y destino.");
        return;
    }

    // Obtención de los precios base de las ciudades de origen y destino
    const basePriceOrigin = cityPrices[originCountry][originCity];
    const basePriceDestination = cityPrices[destinationCountry][destinationCity];

    // Calculo del volumen en cm³
    const volume = length * width * height;

    // Ajuste del costo con base en peso y volumen
    const volumeCost = volume * 0.0002; // Factor de costo de volumen
    const weightCost = weight * 0.5; // Factor de costo por peso

    // Ajuste de tarifa por tipo de servicio
    const serviceMultiplier = serviceType === "express" ? 1.5 : 1;

    // Calculo del costo total
    const totalPrice = ((basePriceOrigin + basePriceDestination + volumeCost + weightCost) * serviceMultiplier).toFixed(2);

    // Muestra del resultado en HTML
    const quoteResult = document.getElementById("quoteResult");
    const quoteDetails = document.getElementById("quoteDetails");
    quoteDetails.innerHTML = `
        Origen: ${originCountry} - ${originCity} (S/.${basePriceOrigin})<br>
        Destino: ${destinationCountry} - ${destinationCity} (S/.${basePriceDestination})<br>
        Peso: ${weight} kg<br>
        Volumen: ${volume} cm³<br>
        Tipo de Servicio: ${serviceType}<br>
        <strong>Costo Total: S/.${totalPrice}</strong>
    `;
    quoteResult.classList.remove("d-none");
}

// Función para generar una llave única
function generateKey() {
    // Creación de un objeto Date con la fecha actual
    const today = new Date();
    
    // Obtención de los primeros 2 dígitos del año (por ejemplo, '24' para 2024)
    const year = today.getFullYear().toString().substr(2, 2);
    
    // Obtención del mes y día con formato de 2 dígitos (por ejemplo, '11' para noviembre y '20' para el día)
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    // Concatenación  del año, mes y día
    const datePart = year + month + day;

    // Generación de 4 dígitos aleatorios entre 0000 y 9999
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return datePart + randomPart;
}

// Función para el guardado de la cotización en localStorage
function saveQuote() {

    const originCountry = document.getElementById("originCountry").value;
    const originCity = document.getElementById("originCity").value;
    const destinationCountry = document.getElementById("destinationCountry").value;
    const destinationCity = document.getElementById("destinationCity").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const serviceType = document.getElementById("serviceType").value;
    
    // Calculo del volumen en cm³
    const volume = length * width * height;
    
    // Generación de llave única
    const key = generateKey();
    
    // Creacion un objeto con los datos
    const quoteData = {
        key: key,
        Origen: { pais: originCountry, ciudad: originCity },
        Destino: { pais: destinationCountry, ciudad: destinationCity },
        Dimensiones: { peso: weight, volumen: volume },
        servicio: serviceType
    };

    // Guardado en localStorage
    localStorage.setItem(key, JSON.stringify(quoteData));

    // Muestra del resultado en HTML
    const localStorageResult = document.getElementById("localStorageResult");
    const localStorageDetails = document.getElementById("localStorageDetails");
    localStorageDetails.innerHTML = `
    Key: ${key} <br>
    Origen: ${originCountry} - ${originCity} <br>
    Destino: ${destinationCountry} - ${destinationCity} <br>
    Peso: ${weight} kg<br>
    Volumen: ${volume} cm³<br>
    Tipo de Servicio: ${serviceType}
    `;
    localStorageResult.classList.remove("d-none");
}

// Calculo de costos promedio por país
function calculateAverageCosts() {
    const averageCosts = {};
    for (const country in cityPrices) {
        const prices = Object.values(cityPrices[country]);
        const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        averageCosts[country] = average.toFixed(2);
    }
    return averageCosts;
}

// Renderización del gráfico
function renderChart() {
    const averageCosts = calculateAverageCosts();
    const ctx = document.getElementById('averageCostChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(averageCosts), // Nombres de los países
            datasets: [{
                label: 'Costo Promedio (S/.)',
                data: Object.values(averageCosts), // Costos promedio
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(100, 149, 237, 0.2)',
                    'rgba(255, 69, 0, 0.2)',
                    'rgba(144, 238, 144, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(100, 149, 237, 1)',
                    'rgba(255, 69, 0, 1)',
                    'rgba(144, 238, 144, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Llamada a la función para renderizar el gráfico cuando la página cargue
document.addEventListener('DOMContentLoaded', renderChart);