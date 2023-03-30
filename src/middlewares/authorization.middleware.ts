import passport from 'passport';
import { GraphQLError } from 'graphql';

export default function authorizationMiddleware<
  ParentType = any,
  ArgsType = any,
  ContextType = any,
  ReturnType = any
>(
  validRoles: string[],
  resolver: (
    parent: ParentType,
    args: ArgsType,
    context: ContextType
  ) => Promise<ReturnType>
) {
  return function (parent: ParentType, args: ArgsType, context: ContextType) {
    const { req, res } = context as any;
    return new Promise<ReturnType>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) reject(err);
        if (!user) {
          reject(
            new GraphQLError('User is not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
              },
            })
          );
        } else if (user.roles.some((role) => validRoles.includes(role))) {
          return resolve(
            resolver(parent, args, context) as Promise<ReturnType>
          );
        }
        reject(
          new GraphQLError('User is not authorized', {
            extensions: {
              code: 'UNAUTHORIZED',
              http: { status: 403 },
            },
          })
        );
      })(req, res, undefined);
    });
  };
}
