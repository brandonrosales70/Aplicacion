# Proyecto Web: Envios Ya

## Descripción
**Envios Ya** es un proyecto académico diseñado para ofrecer una plataforma funcional de cotización y rastreo de envíos, tanto nacionales como internacionales. Este proyecto incluye funcionalidades clave como registro y autenticación de usuarios, un diseño responsivo, y un sistema sencillo para gestionar información en LocalStorage y SessionStorage.

## Características Principales
- **Cotización de envíos:**
  - Tarifas dinámicas según el tipo de servicio (nacional o internacional).
  - Visualización clara de precios y detalles del envío.

- **Rastreo de paquetes:**
  - Búsqueda mediante número de seguimiento.
  - Simulación de estados de envío almacenados en LocalStorage.

- **Registro y login:**
  - Validación de usuarios para garantizar una experiencia personalizada.
  - Persistencia de sesión mediante SessionStorage.

- **Diseño responsivo:**
  - Adaptación a dispositivos móviles, tabletas y pantallas de escritorio.

## Estructura del Proyecto
El proyecto está compuesto por los siguientes archivos y carpetas principales:

```
EnviosYa/
|-- index.html          # Página principal
|-- cotizar.html        # Página de cotización
|-- rastrear.html       # Página de rastreo
|-- login.html          # Página de registro/login
|-- css/
|   |-- styles.css      # Estilos generales
|-- js/
|   |-- app.js          # Lógica de cotización y rastreo
|   |-- login.js        # Lógica de autenticación
```

## Tecnologías Utilizadas
- **HTML5:** Para la estructura de las páginas.
- **CSS3:** Para el diseño visual y la responsividad.
- **JavaScript:** Para la lógica y las interacciones dinámicas.
- **LocalStorage y SessionStorage:** Para el almacenamiento básico de datos en el navegador.
