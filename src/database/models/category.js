module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: { 
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: { 
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );

  return Category;
};
