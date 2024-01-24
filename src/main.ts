import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

import { PrismaClientExceptionFilter } from './common/prisma-client-exception/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.use(helmet());
  app.enableCors();
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  const configService: ConfigService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Collect Your Shopping')
    .setDescription(
      'The API documentation of the Collect Your Shopping Backend',
    )
    .setVersion('0.1')
    .build();
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://collect-your-shopping.firebaseio.com',
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT || '3000'));
}
bootstrap();
