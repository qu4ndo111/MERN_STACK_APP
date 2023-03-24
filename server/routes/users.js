import express from 'express';
import {
    signin,
    signup,
    profile,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:userId', profile)

export default router;