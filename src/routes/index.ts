import { Router } from 'express';
import userRouter from './user.routes';

const router = Router();

router.use('/auth', userRouter);
router.use('/users', userRouter); // Example: sharing the same router or creating a separate one for users

export default router;
