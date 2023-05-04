import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"

export const home = async (req, res) => {
    res.send(`<h1>App is working </h1>`)
}

export const createUser = asyncHandler (async (req, res) => {
    try {
        const { name, address, email } = req.body

        if (!name) throw new CustomError("Please enter name",400);
        if (!address) throw new CustomError("Please enter Address",400);
        if (!email) throw new CustomError("Please enter Email",400);

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new CustomError('Email already exist');

        const newUser = await User.create({
            name,
            address,
            email
        });

        res.status(200).json({
            success: true,
            message: `User created successfully`,
            newUser,
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

export const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json({
            success: true,
            message: `Fetched user from database`,
            allUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const editUser = async (req, res) => {
    try {
        const userId = req.params.id
        const { name, address, email } = req.body
        const updatedUser = await User.findByIdAndUpdate(userId, { name, address, email });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id:userId });
        res.status(200).json({
            success: true,
            message:`User retrieved succesfully`,
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if(!userId) throw new CustomError()
        const deleteUser = await User.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: `User Deleted Succesfully`,
            deleteUser,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}