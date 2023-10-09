const { User, OTP } = require('../models/index.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const config = require('../config/env.config');
const jwt = require('jsonwebtoken');

// send otp
const sendOTP = async (userId) => {
    const newOTP = Math.floor(1000000 + Math.random() * 9000000).toString();
    await OTP.create({
        user_id: userId,
        OTP: newOTP,
    });
    console.log('OTP sent');
};

// send jwt token
const signToken = (userId) => jwt.sign({ id: userId }, config.jwt_secret);

// *** +[1] Registration Handler *** //
exports.registration = catchAsync(async (req, res, next) => {
    const { firstName, lastName, password, mobile } = req.body;

    const age = req.body.age * 1;
    const howFoundUs_id = req.body.howFoundUs_id * 1;

    // Validate all input fields
    if (
        !firstName ||
        !lastName ||
        !age ||
        !howFoundUs_id ||
        !password ||
        !mobile
    ) {
        return next(new AppError('Please fill all input fields', 400));
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
        `${password}${config.pepper}`,
        config.salt_rounds,
    );

    // create new user
    const user = await User.create({
        firstName,
        lastName,
        age,
        howFoundUs_id,
        password: hashedPassword,
        mobile,
    });

    // generate and send otp
    await sendOTP(user.id);

    // create new otp for user

    res.status(201).json({
        success: true,
        id: user.id,
    });
});

// *** +[2] Login Handler *** //

exports.login = catchAsync(async (req, res, next) => {
    const user_id = req.body.user_id * 1;
    const reqOTP = req.body.otp;

    // 1) Validate all input fields and check if user exists and verified
    if (!user_id || !reqOTP) {
        return next(new AppError('Please fill all input fields', 400));
    }
    const user = await User.findByPk(user_id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    if (!user.verified_boolean) {
        await sendOTP(user.id);
        return next(new AppError('User not verified', 401));
    }

    //  2) find otp and check if otp is correct
    const user_otp = await OTP.findOne({
        where: { otp: reqOTP, user_id: user_id },
    });

    if (!user_otp || !user_otp.otp === reqOTP) {
        await sendOTP(user.id);
        return next(new AppError('OTP is incorrect', 401));
    }

    // 3) check if expired or status is used
    const expiredAfter = user_otp.createdAt.getTime() + 4 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > expiredAfter) {
        await sendOTP(user.id);
        return next(new AppError('Token Expired', 401));
    }

    if (user_otp.status === 'used') {
        await sendOTP(user.id);
        return next(new AppError('OTP already used', 401));
    }

    // 4) update otp status to used
    await OTP.update(
        { status: 'used' },
        {
            where: {
                otp: reqOTP,
            },
        },
    );

    req.user = user;
    // 5) send jwt token
    const token = signToken(user.id);

    res.status(200).json({
        success: true,
        name: `${user.firstName} ${user.lastName}`,
        token,
    });
});

// *** +[3] Verify Handler *** //
exports.verify = catchAsync(async (req, res, next) => {
    const user_id = req.body.user_id * 1;
    const reqOTP = req.body.otp;

    // 1) Validate all input fields and check if user exists and verified
    if (!user_id || !reqOTP) {
        return next(new AppError('Please fill all input fields', 400));
    }

    // 2) get user and check if user exists
    const user = await User.findByPk(user_id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const user_otp = await OTP.findOne({
        where: { otp: reqOTP, user_id: user_id },
    });

    if (!user_otp || !user_otp.otp === reqOTP) {
        await sendOTP(user.id);
        return next(new AppError('OTP is incorrect', 401));
    }

    // 2) check if expired or status is used
    const expiredAfter = user_otp.createdAt.getTime() + 4 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > expiredAfter) {
        await sendOTP(user.id);
        return next(new AppError('Token Expired', 401));
    }
    if (user_otp.status === 'used') {
        await sendOTP(user.id);
        return next(new AppError('OTP already used', 401));
    }

    // 3) update otp status to used
    await OTP.update(
        { status: 'used' },
        {
            where: {
                otp: reqOTP,
            },
        },
    );

    // 4) update user verified status
    await User.update(
        { verified_boolean: true },
        {
            where: {
                id: user_id,
            },
        },
    );

    res.status(200).json({
        success: true,
        message: 'User verified',
    });
});
