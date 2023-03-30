import { GraphQLError } from 'graphql';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import { jwtSecret } from '../../../config';
import AuthRepository from '../../../repositories/AuthRepository';
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
} from '../generated-types/user-resolvers-types';
export default class UserService {
  authRepository = new AuthRepository();
  constructor() {}

  async LoginUser(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        UsersAndRoles: true,
      },
    });
    if (
      !user ||
      !(await this.authRepository.comparePassword(password, user.password))
    ) {
      throw new GraphQLError('Invalid credentials', {
        extensions: {
          http: { status: 401 },
        },
      });
    }
    const token = sign(
      {
        id: user.id,
        roles: user.UsersAndRoles.map((e) => e.roleName),
      },
      jwtSecret!,
      { expiresIn: '7 days' }
    );

    return {
      expiresAt: moment().add(168, 'hours').toDate(),
      id: user.id,
      roles: user.UsersAndRoles.map((e) => e.roleName),
      token,
    };
    // const { name, password } = req.body;
    // const user = await AuthRepository.getUserByName(name);
    // // Check if user exists or if the password is valid
    // if (
    //   !user ||
    //   !(await AuthRepository.comparePassword(password, user.password))
    // ) {
    //   return res.status(401).json({ error: 'Invalid Credentials!' });
    // } else {
    //   const token = sign(
    //     {
    //       id: user.id,
    //       name: user.name,
    //     },
    //     jwtSecret!,
    //     { expiresIn: '7 days' }
    //   );
    //   const result = {
    //     token: `Bearer ${token}`,
    //     expiryDate: moment().add(168, 'hours'),
    //     id: user.id,
    //     name: user.name,
    //   };
    //   return res.status(200).json({
    //     ...result,
    //     error: undefined,
    //   });
    // }
  }
  async RegisterUser(input: RegisterInput) {
    const { firstName, lastName, password, roleName, email } = input;
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        password: await this.authRepository.hashPassword(password),
        email,
        UsersAndRoles: {
          create: {
            roleName,
          },
        },
      },
      include: {
        UsersAndRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
