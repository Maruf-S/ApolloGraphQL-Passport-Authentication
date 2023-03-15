import * as passport from 'passport';

/**
 * @DESC General User Authentication
 */
const userAuth = function (req: any, res: any, next: any) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: info?.message || 'Unauthenticated user!' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
export default userAuth;
