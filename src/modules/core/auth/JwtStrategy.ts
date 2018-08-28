import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../../auth/services/AuthService';

export class JwtStrategy extends Strategy {
  private authService: AuthService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECREET,
    }, async (req, payload, next) => await this.verify(req, payload, next));
    // console.log('this :', this);
    passport.use(this);
  }

  async verify(req, payload, done) {
    console.log('payload :', payload);
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}
