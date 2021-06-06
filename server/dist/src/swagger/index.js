"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const setupSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('SWAGGER_API_NAME')
        .setDescription('SWAGGER_API_DESCRIPTION')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const customOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'My API Docs',
    };
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api/docs', app, document, customOptions);
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=index.js.map