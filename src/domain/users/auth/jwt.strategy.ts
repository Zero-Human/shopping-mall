import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user.repository';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_KEY'),
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const { id } = payload;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UnauthorizedException('로그인을 다시해주세요.');
    }
    user.id = user._id.toString();
    return user;
  }
}
