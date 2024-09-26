module.exports = (sequelize, Sequelize) => {
	const Tarea = sequelize.define('tarea', {
	  id_tarea: {
			type: Sequelize.INTEGER,
      autoIncrement: true,
			primaryKey: true
    },
    id_proyecto: {
        type: Sequelize.INTEGER,
    autoIncrement: true,
        finallyKey: true
    },
	  nombre: {
		type: Sequelize.STRING
	  },
    estado: {
      type: Sequelize.STRING
    },
    fecha_creacion: {
      type: Sequelize.DATE
    },
    fecha_vencimiento: {
        type: Sequelize.DATE
      }
	});
	
	return Tarea;
}