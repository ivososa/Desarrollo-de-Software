const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Mi API de Artículos',
        version: '1.0.0',
        description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desarrollo',
        },
    ],
    components: {
        schemas: {
            Articulos: {
                type: 'object',
                required: [
                    'Nombre',
                    'Precio',
                    'CodigoDeBarra',
                    'IdCategoria',
                    'Stock',
                    'FechaAlta',
                    'Activo',
                ],
                properties: {
                    Nombre: {
                        type: 'string',
                        example: 'Camiseta',
                    },
                    Precio: {
                        type: 'number',
                        example: 29.99,
                    },
                    CodigoDeBarra: {
                        type: 'string',
                        example: '1234567890123',
                    },
                    IdCategoria: {
                        type: 'integer',
                        example: 2,
                    },
                    Stock: {
                        type: 'integer',
                        example: 100,
                    },
                    FechaAlta: {
                        type: 'string',
                        format: 'date',
                        example: '2023-01-01',
                    },
                    Activo: {
                        type: 'boolean',
                        example: true,
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Asegúrate de que este path sea correcto
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
