import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

const port = process.env.PORT || process.env.HTTP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Rocketman api')
    .setDescription('Rocketman api docs')
    .setVersion('1.0')
    .addTag('rocketman')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('').useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  app.use(bodyParser.urlencoded({ extended: true }));

  app.enableCors();

  await app.listen(port).then(() => {
    new Logger().log(port, 'Server Port');
  });
}
bootstrap();
