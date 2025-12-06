import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { Server } from 'socket.io';
import { createServer } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const socketPort = config.get<number>('socket_port');

  const server = createServer();
  //const io=new Server(server, {
  //   cors: { origin: '*' },
  // });

  server.listen(socketPort, () => {
    console.log(`Socket server running on port ${socketPort}`);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
