import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Feedbacker API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory,{
    customSiteTitle: 'Feedbacker API',
  });

  await app.listen(3000);
}
bootstrap();
