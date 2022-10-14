import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "log"],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(5000);
}

bootstrap();
