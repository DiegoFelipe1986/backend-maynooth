const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Maynooth',
      version: '1.0.0',
      description: 'Challenge VIIO',
    },
  },
  apis: ['./routes/*.js'], // Ruta a tus archivos con definiciones de rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
