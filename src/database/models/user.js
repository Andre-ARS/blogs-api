module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { 
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      displayName: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      image: { 
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
