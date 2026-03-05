import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';

const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {

  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    throw new ApiError(401, 'Not authorized to access this route');
  }
});

export default protect;
