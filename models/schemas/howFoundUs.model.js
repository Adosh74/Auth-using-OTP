module.exports = (db, type) =>
    db.define('howFoundUs', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        value: {
            type: type.STRING,
            allowNull: false,
            unique: true,
        },
    });
