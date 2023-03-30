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
  const userExists = await prisma.user.findUnique({
    include: { UsersAndRoles: true },
    where: {
      id,
    },
  });
  return !userExists
    ? undefined
    : { ...userExists, roles: userExists.UsersAndRoles.map((e) => e.roleName) };
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
