import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import * as userService from '../services/user.service';

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.register(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req: any, res: Response) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
