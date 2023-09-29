const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
let count = 509;
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      
      defaultValue: () => {
        return count++;}
    },
    name: {
      type: DataTypes.JSONB, // Usamos JSONB para datos JSON anidados
      allowNull: false,
      get() {
          // Getter personalizado para combinar forename y surname
          const forename = this.getDataValue('name')?.forename || '';
          const surname = this.getDataValue('name')?.surname || '';
          return {
            forename: forename,
            surname: surname,
          }
      },
  },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    teams:{
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, { timestamps: false });
};