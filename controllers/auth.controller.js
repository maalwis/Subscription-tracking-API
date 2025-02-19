import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;

        // Check user already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password: hashPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();

        await session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: {
                token,
                user: newUsers[0],
            }
        });

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);

    }
}

export const signIn = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {email, password} = req.body;

        // Check user already exists
        const user = await User.findOne({email});

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({
            success: true,
            message: 'sign in successful',
            data: {
                token,
                user
            }
        });

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);

    }
}

// For stateless JWT, sign out can simply instruct the client to remove the token.
export const signOut = async (req, res, next) => {
    try {
        // If you were using cookies, you could clear them here.
        res
            .status(200)
            .json({ success: true, message: 'Signed out successfully' });
    } catch (error) {
        next(error);
    }
};