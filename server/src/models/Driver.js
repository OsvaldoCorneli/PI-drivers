const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
      type: DataTypes.JSONB,
      allowNull: false,
      get(){
        const url = this.getDataValue('image')?.url || '';
        return {
          url: url
        }
      }
    },
    nationality:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  }, { timestamps: false });
};