import { AppDataSource } from '../config/db';
import { User } from '../models/user.entity';
import ApiError from '../utils/ApiError';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRE as any) || '30d',
  });
};

export const register = async (userData: any) => {
  const { name, email, password } = userData;

  const userExists = await userRepository.findOne({ where: { email } });

  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = userRepository.create({
    name,
    email,
    password, // Note: In a real app, password should be hashed here
  });

  await userRepository.save(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user.id),
  };
};

export const login = async (loginData: any) => {
  const { email, password } = loginData;

  // In TypeORM, to select a column marked with select: false, you need to add it explicitly
  const user = await userRepository.createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.email = :email", { email })
    .getOne();

  if (!user || user.password !== password) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user.id),
  };
};
