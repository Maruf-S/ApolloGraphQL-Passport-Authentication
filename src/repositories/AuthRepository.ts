import prisma from '../db/db';
import { compare, hash } from 'bcryptjs';
// import { Prisma } from '@prisma/client';
export default class AuthRepository {
  constructor() {}
  async comparePassword(password, hash) {
    // Check weather or not the passwords match
    return await compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }
}
