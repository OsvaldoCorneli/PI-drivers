const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: {
          args: [3, 3], // Verifica que la cadena tenga exactamente 3 caracteres.
          msg: 'La clave primaria debe tener exactamente 3 palabras.'}}
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
   imagen: {
    type: DataTypes.STRING,
      allowNull: false,
   },
   nationality:{
    type: DataTypes.STRING,
      allowNull: false,
   },
   birthdate:{
    type: DataTypes.DATE,
      allowNull: false,
   }

  }, { timestamps: false });
};