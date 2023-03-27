import prisma from '../db/db';
import { compare } from 'bcryptjs';
import { hashPassword } from '../utils/auth';
// import { Prisma } from '@prisma/client';
class AuthRepository {
  constructor() {}
  async getUserById(
    id: number,
    select: any // Prisma.UserSelect | undefined
  ): Promise<any> {}
  async createUser({ name, password }: { name: string; password: string }) {}
  async getUserByName(name: string) {}
  async UpdateUser(
    id: number,
    {
      name,
    }: {
      name: string;
    }
  ) {}
  async comparePassword(password, hash) {
    // Check weather or not the passwords match
    return await compare(password, hash);
  }
  async changePassword({ id, password }: { id: number; password: string }) {}
}

export default new AuthRepository();
