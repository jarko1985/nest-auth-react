import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:["http://localhost:3000"],
    credentials:true
  });
  const logger = new Logger();
  const port = 8000;
  await app.listen(port, () => {
    logger.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
