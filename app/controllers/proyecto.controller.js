const db = require('../config/db.config.js');
const Proyecto = db.Proyecto;


exports.create = (req, res) => {
    let proyecto = {};

    try {
        proyecto.id_usuario = req.body.id_usuario;
        proyecto.nombre = req.body.nombre;
        proyecto.descripcion = req.body.descripcion;
        proyecto.fecha_creacion = req.body.fecha_creacion;

        Proyecto.create(proyecto).then(result => {
            res.status(200).json({
                message: "Proyecto creado exitosamente con id = " + result.id_proyecto,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el proyecto!",
            error: error.message
        });
    }
};


exports.retrieveAllProyectos = (req, res) => {
    Proyecto.findAll()
        .then(proyectoInfos => {
            res.status(200).json({
                message: "¡Proyectos obtenidos exitosamente!",
                proyectos: proyectoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los proyectos!",
                error: error
            });
        });
};


exports.getProyectoById = (req, res) => {
    let proyectoId = req.params.id;
    Proyecto.findByPk(proyectoId)
        .then(proyecto => {
            if (!proyecto) {
                return res.status(404).json({
                    message: "Proyecto no encontrado con id = " + proyectoId
                });
            }
            res.status(200).json({
                message: "Proyecto obtenido exitosamente con id = " + proyectoId,
                proyecto: proyecto
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener proyecto con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);
    
        if (!proyecto) {
            res.status(404).json({
                message: "No se encontró el Proyecto para actualizar con id = " + proyectoId,
                proyecto: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                id_usuario: req.body.id_usuario,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                fecha_creacion: req.body.fecha_creacion
            };
            
            let result = await Proyecto.update(updatedObject, { returning: true, where: { id_proyecto: proyectoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un proyecto con id = " + proyectoId,
                    error: "No se pudo actualizar el proyecto",
                });
            } else {
                res.status(200).json({
                    message: "Actualización exitosa del Proyecto con id = " + proyectoId,
                    proyecto: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un proyecto con id = " + req.params.id,
            error: error.message
        });
    }
};


exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No existe el proyecto con id = " + proyectoId,
                error: "404",
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del Proyecto con id = " + proyectoId,
                proyecto: proyecto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un proyecto con id = " + req.params.id,
            error: error.message,
        });
    }
};
