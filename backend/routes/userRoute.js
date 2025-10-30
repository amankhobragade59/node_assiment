import express from 'express'
import { getUser,forgetPassword,resetPassword } from '../constrollers/userController.js';
const router = express.Router();

router.get('/:id',getUser);
router.post('/forget-password',forgetPassword);
router.post('/reset-password/:token',resetPassword);

export default router;