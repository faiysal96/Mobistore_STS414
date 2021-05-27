import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { TrimStringsPipe } from './common/pipes/trim-strings.pipe'
import { ValidationPipe } from '@nestjs/common';

import { useContainer } from 'class-validator';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
// import * as dotenv from 'dotenv'



async function bootstrap() {
  // if (process.env.NODE_ENV !== 'production') {
  //   await dotenv.config();
  // }

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // enable gzip compression.
  app.use(compression());

  // protect app from brute-force attacks - Throttling
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );


  // // listen on port
  // const serverConfig = config.get('server');
  // const port = process.env.SERVER_PORT || serverConfig.port;

  /**
   * Enables CORS
   * 
   * use process.env if it has to run in developement only
   */
  app.enableCors();

  /**
   * Swagger Set up
   */
  setupSwagger(app);


  /**
   * Gobal Pipes
   * https://docs.nestjs.com/pipes#global-scoped-pipes
   */
  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe());


  /**
   * TODO
   */

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(5000);

}
bootstrap();


// https://github.com/MidoAhmed/nestjs-api-boilerplate/tree/master/scripts DEPLOY