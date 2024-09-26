module.exports = (sequelize, Sequelize) => {
	const Proyecto = sequelize.define('proyecto', {
	  id_proyecto: {
			type: Sequelize.INTEGER,
      autoIncrement: true,
			primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
    },
	  nombre: {
		type: Sequelize.STRING
	  },
    descripcion: {
      type: Sequelize.STRING
    },
    fecha_creacion: {
      type: Sequelize.DATE
    }
	});
	
	return Proyecto;
}