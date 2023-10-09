const Sequelize = require('sequelize');
const { db } = require('../config/database.config');

const UserModel = require('./schemas/user.model');
const HowFoundUsModel = require('./schemas/howFoundUs.model');
const OTPModel = require('./schemas/otp.model');

const User = UserModel(db, Sequelize);
const HowFoundUs = HowFoundUsModel(db, Sequelize);
const OTP = OTPModel(db, Sequelize);

// User and OTP relationship (one to many)
OTP.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
User.hasMany(OTP, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// User and HowFoundUs relationship (one to many)
User.belongsTo(HowFoundUs, {
    foreignKey: 'howFoundUs_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
HowFoundUs.hasMany(User, {
    foreignKey: 'howFoundUs_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// create tables if not exist
db.sync({ force: false }).then(() => {
    console.log('Tables Created Successfully!');
});
module.exports = { User, HowFoundUs, OTP };
