import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('SWAGGER_API_NAME')
        .setDescription('SWAGGER_API_DESCRIPTION')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
        const customOptions: SwaggerCustomOptions = {
            swaggerOptions: {
              persistAuthorization: true,
            },
            customSiteTitle: 'My API Docs',
          };
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs', app, document, customOptions);
};
