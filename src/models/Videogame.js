const { DataTypes } = require("sequelize")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      validate: {
        is: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,

        is: /(https?:\/\/.*\.(?:png|jpg|jpeg))/i,
      },
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      validate: {
        is: /^([1-9]|0[1-9]|1[012])([-])([1-9]|0[1-9]|[12][0-9]|3[01])\2(\d{4})$|^(\d{4})([-])([1-9]|0[1-9]|[12][0-9]|3[01])\6([1-9]|0[1-9]|[12][0-9]|3[01])$/,
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    created_in_db: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  })
}
