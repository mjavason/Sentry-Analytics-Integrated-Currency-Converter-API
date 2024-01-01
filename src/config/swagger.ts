// Swagger options
export const SWAGGER_OPTIONS = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Currency Converter API',
      version: '1.0.0',
      description:
        'API documentation for currency conversion. Get the latest exchange rates and convert currencies.',
      contact: {
        name: 'Orji Michael',
        email: 'orjimichael4886@gmail.com',
      },
    },
    servers: [
      { url: 'http://localhost:5000/api/v1', description: 'Development' },
      // { url: 'https://currency-converter-api.onrender.com/api/v1', description: 'Staging' },
      // { url: 'https://api.currencyconverter.com/api/v1', description: 'Production' },
    ],
    tags: [
      {
        name: 'Currency Converter',
        description: 'Endpoints for currency rates conversion.',
      },
    ],
  },
  apis: ['**/*.jsdoc.ts'], // Define paths to your API routes
};
