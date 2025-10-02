import { Module } from '@nestjs/common';
import { PrestadoresService } from './prestadores.service';
import { PrestadoresController } from './prestadores.controller';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PrestadoresService],
  controllers: [PrestadoresController],
  exports: [PrestadoresService],
})
export class PrestadoresModule {}
