module.exports = (sequelize, Sequelize) => {
	const Persona = sequelize.define('persona', {
	  id_persona: {
			type: Sequelize.INTEGER,
      autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
    apellido: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.INTEGER
    },
    direccion: {
      type: Sequelize.STRING
    },
    fecha_registro: {
      type: Sequelize.DATE
    },
    estado: {
      type: Sequelize.INTEGER
    }
	});
	
	return Persona;
}
