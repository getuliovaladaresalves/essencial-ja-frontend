import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PrestadoresService } from './prestadores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('prestadores')
@UseGuards(JwtAuthGuard)
export class PrestadoresController {
  constructor(private readonly prestadoresService: PrestadoresService) {}

  @Get()
  async findAll() {
    const prestadores = await this.prestadoresService.findAll();
    
    return {
      message: 'Prestadores listados com sucesso',
      data: prestadores,
      total: prestadores.length,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const prestador = await this.prestadoresService.findById(id);
    
    if (!prestador) {
      return {
        message: 'Prestador não encontrado',
        data: null,
      };
    }
    
    return {
      message: 'Prestador encontrado com sucesso',
      data: prestador,
    };
  }

  @Get('servico/:servicoId')
  async findByServico(@Param('servicoId') servicoId: string) {
    const prestadores = await this.prestadoresService.findByServico(servicoId);
    
    return {
      message: 'Prestadores do serviço listados com sucesso',
      data: prestadores,
      total: prestadores.length,
    };
  }
}
