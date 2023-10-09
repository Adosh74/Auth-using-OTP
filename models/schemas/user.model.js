module.exports = (db, type) =>
    db.define(
        'users',
        {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: type.STRING,
                allowNull: false,
            },
            lastName: {
                type: type.STRING,
                allowNull: false,
            },
            age: {
                type: type.INTEGER,
                allowNull: false,
            },
            howFoundUs_id: {
                type: type.INTEGER,
                allowNull: true,
                references: {
                    model: 'howFoundUs',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            verified_boolean: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            mobile: {
                type: type.STRING,
                allowNull: false,
            },
            password: {
                type: type.STRING,
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
