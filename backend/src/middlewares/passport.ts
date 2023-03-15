import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from '../config';
import prisma from '../db/db';
import AuthRepository from '../repositories/AuthRepository';
import { User } from '@prisma/client';
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};
async function checkUserExists(id: number) {
  let user;
  user = await AuthRepository.getUserById(id, {
    id: true,
    name: true,
    password: true,
  });
  return user;
}
export default (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await checkUserExists(payload.id)
        .then(async (user) => {
          if (user) {
            return done(undefined, user);
          }
          return done(undefined, false);
        })
        .catch((err) => {
          console.log(err);
          done(undefined, false);
        });
    })
  );
};
