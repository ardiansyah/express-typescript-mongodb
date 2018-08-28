import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Container } from 'typedi';
import { AuthService } from '../modules/auth/services/AuthService';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECREET
};

const authService = Container.get<AuthService>(AuthService);

async function verify(payload, done) {
  console.log('payload :', payload);
  const isValid = await authService.validateUser(payload);

  if (!isValid) {
    return done('Unauthorized', false);
  }

  done(null, payload);
}

export function setupAuth(app) {
  app.use(passport.initialize());
  passport.use(new JwtStrategy(opts, verify));
}