import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import user from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });

        if (!existingUser) return res.statis(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, 'user', { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    
    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await user.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id, }, 'user', { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong." });
    }
};

export const profile = async (req, res) => {
    const { userId } = req.params;

    try {
        const profile = await user.findById(userId);

        if(!profile) return res.status(404).json({ message: "User not found." });

        res.status(200).json({ name: profile?.name, id: profile?._id, avatar: profile?.avatar, coverImage: profile?.coverImage });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const update = req.body;

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send("No user with that id");
    }

    const updateProfile = await user.findByIdAndUpdate(userId, {
       ...update,
        id: userId
    }, { new: true });

    res.json(updateProfile);
}