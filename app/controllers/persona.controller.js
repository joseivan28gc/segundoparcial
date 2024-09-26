const db = require('../config/db.config.js');
const Persona = db.Persona;


exports.create = (req, res) => {
    let persona = {};

    try {
        persona.nombre = req.body.nombre;
        persona.apellido = req.body.apellido;
        persona.email = req.body.email;
        persona.telefono = req.body.telefono;
        persona.direccion = req.body.direccion;
        persona.fecha_registro = req.body.fecha_registro;
        persona.estado = req.body.estado;

        Persona.create(persona).then(result => {
            res.status(200).json({
                message: "Persona creada exitosamente con id = " + result.id_persona,
                persona: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la persona!",
            error: error.message
        });
    }
};


exports.retrieveAllPersonas = (req, res) => {
    Persona.findAll()
        .then(personaInfos => {
            res.status(200).json({
                message: "¡Personas obtenidas exitosamente!",
                personas: personaInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener las personas!",
                error: error
            });
        });
};


exports.getPersonaById = (req, res) => {
    let personaId = req.params.id;
    Persona.findByPk(personaId)
        .then(persona => {
            if (!persona) {
                return res.status(404).json({
                    message: "Persona no encontrada con id = " + personaId
                });
            }
            res.status(200).json({
                message: "Persona obtenida exitosamente con id = " + personaId,
                persona: persona
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener persona con id!",
                error: error
            });
        });
};


exports.updateById = async (req, res) => {
    try {
        let personaId = req.params.id;
        let persona = await Persona.findByPk(personaId);
    
        if (!persona) {
            res.status(404).json({
                message: "No se encontró la Persona para actualizar con id = " + personaId,
                persona: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                fecha_registro: req.body.fecha_registro,
                estado: req.body.estado
            };
            
            let result = await Persona.update(updatedObject, { returning: true, where: { id_persona: personaId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar una persona con id = " + personaId,
                    error: "No se pudo actualizar la persona",
                });
            } else {
                res.status(200).json({
                    message: "Actualización exitosa de la Persona con id = " + personaId,
                    persona: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar una persona con id = " + req.params.id,
            error: error.message
        });
    }
};


exports.deleteById = async (req, res) => {
    try {
        let personaId = req.params.id;
        let persona = await Persona.findByPk(personaId);

        if (!persona) {
            res.status(404).json({
                message: "No existe la persona con id = " + personaId,
                error: "404",
            });
        } else {
            await persona.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la Persona con id = " + personaId,
                persona: persona,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar una persona con id = " + req.params.id,
            error: error.message,
        });
    }
};
