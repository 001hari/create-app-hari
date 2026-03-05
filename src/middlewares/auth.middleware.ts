import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import { AppDataSource } from '../config/db';
import { User } from '../models/user.entity';
import asyncHandler from '../utils/asyncHandler';

const userRepository = AppDataSource.getRepository(User);

const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await userRepository.findOne({ 
      where: { id: decoded.id }
    });
    
    if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    next();
  } catch (err) {
    throw new ApiError(401, 'Not authorized to access this route');
  }
});

export default protect;
