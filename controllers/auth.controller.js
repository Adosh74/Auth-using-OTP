const { User, OTP } = require('../models/index.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// otp generator
const sendOTP = () => Math.floor(1000000 + Math.random() * 9000000).toString();

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

    // create new user
    const user = await User.create({
        firstName,
        lastName,
        age,
        howFoundUs_id,
        password,
        mobile,
    });

    const otpGenerated = sendOTP();

    // create new otp for user
    await OTP.create({
        user_id: user.id,
        otp: otpGenerated,
    });

    res.status(201).json({
        success: true,
        id: user.id,
    });
});
