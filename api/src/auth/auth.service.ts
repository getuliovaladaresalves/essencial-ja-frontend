import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    // Verificar se já existe um usuário com o mesmo email
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Criptografar a senha
    const saltRounds = 12;
    const senhaHash = await bcrypt.hash(dto.senha, saltRounds);

    // Salvar o novo usuário no banco de dados
    const user = await this.prisma.user.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senhaHash,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
      },
    });

    return {
      message: 'Usuário criado com sucesso',
      user,
    };
  }

  async login(dto: LoginUserDto) {
    // Buscar o usuário pelo email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Comparar a senha fornecida com a senha criptografada
    const isPasswordValid = await bcrypt.compare(dto.senha, user.senhaHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token JWT
    const payload = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Login realizado com sucesso',
      access_token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        criadoEm: user.criadoEm,
      },
    };
  }

  async validateUser(email: string, senha: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(senha, user.senhaHash)) {
      const { senhaHash, ...result } = user;
      return result;
    }

    return null;
  }
}
