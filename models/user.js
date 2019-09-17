module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
 return user;
}