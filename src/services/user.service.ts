import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRE as any) || '30d',
  });
};

export const register = async (userData: any) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id.toString()),
  };
};

export const login = async (loginData: any) => {
  const { email, password } = loginData;

  const user: any = await User.findOne({ email }).select('+password');

  if (!user || user.password !== password) {
    throw new ApiError(401, 'Invalid credentials');
  }


  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id.toString()),
  };
};
