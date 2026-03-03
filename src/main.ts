import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /**
     * Настройка CORS для разрешения запросов с Vue приложения DEEPSEEEK
     */
    app.enableCors({
        origin: 'http://localhost:5173', // URL вашего Vue приложения (порт может быть другим)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true, // Разрешаем передачу cookies
        allowedHeaders: 'Content-Type, Authorization',
    });

    await app.listen(process.env.PORT ?? 3000, () => {
        console.log('Server started', process.env.PORT ?? 3000);
    });
}

bootstrap();
