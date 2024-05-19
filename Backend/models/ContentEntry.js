
module.exports = (sequelize, DataTypes) => {
    const ContentEntry = sequelize.define('ContentEntry', {
        contentTypeId : {
            type : DataTypes.INTEGER,
            references : {
                model : 'ContentTypes',
                key : 'id'
            }
        },
        data : {
            type: DataTypes.JSONB,
            allowNull : false
        }
    });
    return ContentEntry
}