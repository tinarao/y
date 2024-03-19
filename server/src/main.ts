import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    app.setGlobalPrefix('api/v1')
    await app.listen(PORT, () => {
      console.log(`Serving and listening at ${PORT}`)
    });
  } catch (error) {
    console.error(error)
  }
}

start();
