import { dataValid } from '../validation/dataValidation.js';
import Users from '../models/users.js';
import { compare } from '../utils/bcrypt.js';
import {
    generateAccessToken,
    generateRefreshToken,
    parseJWT,
    verifyRefreshToken,
} from '../utils/jwt.js';
import { isExists } from '../validation/sanitization.js';

const login = async (req, res, next) => {
    try {
        const valid = {
            username: 'required',
            password: 'required',
        };
        const user = await dataValid(valid, req.body);
        const data = user.data;
        if (user.message.length > 0) {
            return res.status(400).json({
                errors: user.message,
                message: 'Login Gagal',
                data: null,
            });
        }
        const userExists = await Users.findOne({
            where: {
                username: data.username,
            },
        });
        if (!userExists || !compare(data.password, userExists.password)) {
            // Return a generic error message for both user not found and wrong password
            return res.status(400).json({
                errors: ['Username atau Password Salah'],
                message: 'Login Gagal',
                data: null,
            });
        }

        const usr = {
            name: userExists.name,
            username: userExists.username,
        };
        const token = generateAccessToken(usr);
        const refreshToken = generateRefreshToken(usr);

        return res.status(200).json({
            errors: [],
            message: 'Login sukses',
            data: usr,
            accessToken: token,
            refreshToken: refreshToken,
        });
    } catch (error) {
        next(
            new Error('controllers/userController.js:login - ' + error.message)
        );
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const username = req.user.username;
        const valid = {};
        if (isExists(req.body.password)) {
            valid.currentPassword = 'required'; // Add validation for current password
            valid.password = 'required';
            valid.confirmPassword = 'required';
        }

        const user = await dataValid(valid, req.body);

        // Fetch the user from the database
        const userRecord = await Users.findOne({
            where: {
                username: username,
            },
        });

        if (!userRecord) {
            return res.status(404).json({
                errors: ['User not found'],
                message: 'Update Failed',
                data: null,
            });
        }

        // Check if current password matches the stored password
        const isPasswordMatch = await compare(
            req.body.currentPassword,
            userRecord.password
        );
        if (!isPasswordMatch) {
            return res.status(400).json({
                errors: ['CurrentPassword is incorrect'],
                message: 'Update Failed',
                data: null,
            });
        }

        if (
            isExists(user.data.password) &&
            user.data.password !== user.data.confirmPassword
        ) {
            user.message.push('ConfirmPassword does not match');
        }

        if (user.message.length > 0) {
            return res.status(400).json({
                errors: user.message,
                message: 'Update Failed',
                data: null,
            });
        }

        const result = await Users.update(
            {
                password: user.data.password,
            },
            {
                where: {
                    username: username,
                },
            }
        );

        if (result[0] == 0) {
            return res.status(404).json({
                errors: ['User not found'],
                message: 'Update Failed',
                data: null,
            });
        } else {
            return res.status(200).json({
                errors: [],
                message: 'User password updated successfully',
            });
        }
    } catch (error) {
        next(
            new Error(
                'controllers/userController.js:updatePassword - ' +
                    error.message
            )
        );
    }
};

const setRefreshToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                errors: ['Refresh token not found'],
                message: 'Refresh Failed',
                data: null,
            });
        }
        const verify = verifyRefreshToken(token);
        if (!verify) {
            return res.status(401).json({
                errors: ['Invalid refresh token'],
                message: 'Refresh Failed',
                data: null,
            });
        }
        let data = parseJWT(token);
        const user = await Users.findOne({
            where: {
                email: data.email,
                isActive: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                errors: ['User not found'],
                message: 'Refresh Field',
                data: null,
            });
        } else {
            const usr = {
                userId: user.id,
                name: user.name,
                username: user.username,
            };
            const token = generateAccessToken(usr);
            const refreshToken = generateRefreshToken(usr);
            return res.status(200).json({
                errors: [],
                message: 'Refresh successfully',
                data: usr,
                acessToken: token,
                refreshToken: refreshToken,
            });
        }
    } catch (error) {
        next(
            new Error(
                'controllers/userController.js:setRefreshToken - ' +
                    error.message
            )
        );
    }
};

export { login, updatePassword, setRefreshToken };
