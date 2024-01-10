import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [ConfigModule.forRoot(), GlobalModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
