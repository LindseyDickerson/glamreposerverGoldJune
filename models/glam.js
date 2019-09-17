module.exports = (sequelize, DataTypes) => {
    const Glam = sequelize.define('glam', {
        glamBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        glamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        glamCat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        glamBuyLoc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        glamBuyPrice: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        glamLinkPic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        glamComments: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })
    return Glam;
}