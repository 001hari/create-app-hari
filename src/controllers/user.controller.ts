import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import * as userService from '../services/user.service';


export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.register(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
});


export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);
  console.log(result);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: false,
    sameSite: true,
    maxAge: 60 * 60 * 24*1000,
  })

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getMe = asyncHandler(async (req: any, res: Response) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
