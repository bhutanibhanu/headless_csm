module.exports = (sequelize, DataTypes) => {
    const ContentType = sequelize.define('ContentType' , {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        schema : {
            type : DataTypes.JSONB,
            allowNull : false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    return ContentType;
}