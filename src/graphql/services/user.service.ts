import { GraphQLResolveInfo } from 'graphql';
import { extractSelection } from '../utils/extractSelections';

interface GetUsersArgs {
  info: GraphQLResolveInfo;
}
interface GetUserArgs extends GetUsersArgs {
  id: number;
}
interface UserInput {
  name: string;
  id?: number;
  password: string;
}

export const getUserById = async ({ id, info }: GetUserArgs) => {
  const extractedSelections = extractSelection(info);
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async ({ name, id, password }: UserInput) => {
  const createdUser = await prisma.user.create({
    data: {
      name: name,
      password: password,
      id: id,
    },
  });
  return createdUser;
};
