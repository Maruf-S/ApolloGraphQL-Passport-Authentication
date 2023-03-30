import passport from 'passport';
import { GraphQLError } from 'graphql';

export default function authenticationMiddleware<
  ParentType = any,
  ArgsType = any,
  ContextType = any,
  ReturnType = any
>(
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
        if (!user)
          reject(
            new GraphQLError(info.message ?? 'User is not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
              },
            })
          );
        resolve(
          resolver(parent, args, { ...context, user }) as Promise<ReturnType>
        );
      })(req, res, undefined);
    });
  };
}
