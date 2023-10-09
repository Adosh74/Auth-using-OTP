module.exports = (db, type) =>
    db.define(
        'OTP',
        {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            OTP: {
                type: type.STRING,
                allowNull: false,
            },
            status: {
                type: type.ENUM,
                values: ['used', 'unused'],
                defaultValue: 'unused',
                allowNull: false,
            },
            createdAt: {
                type: type.DATE,
                allowNull: false,
                defaultValue: type.NOW,
            },
        },
        { timestamps: false },
    );
