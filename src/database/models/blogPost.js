module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      content: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      published: { 
        type: DataTypes.DATE,
        allowNull: true
      },
      updated: { 
        type: DataTypes.DATE,
        allowNull: true
      },
    },
    {
      timestamps: false,
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'users' })
  }
  
  return BlogPost;
};