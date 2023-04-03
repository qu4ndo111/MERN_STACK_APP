import express from 'express';
import {
    signin,
    signup,
    profile,
    updateProfile,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:userId', profile);
router.patch('/:userId', auth, updateProfile);

export default router;