import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class PrestadoresService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.prestador.findMany({
      where: {
        disponivel: true,
      },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            criadoEm: true,
          },
        },
        servicos: {
          include: {
            categoria: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
      orderBy: {
        user: {
          nome: 'asc',
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.prestador.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            criadoEm: true,
          },
        },
        servicos: {
          include: {
            categoria: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async findByServico(servicoId: string) {
    return this.prisma.prestador.findMany({
      where: {
        disponivel: true,
        servicos: {
          some: {
            id: servicoId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            criadoEm: true,
          },
        },
        servicos: {
          include: {
            categoria: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
      orderBy: {
        user: {
          nome: 'asc',
        },
      },
    });
  }
}
