const express = require('express');
const router = express.Router();

const personaController = require('../controllers/persona.controller.js');
const usuarioController = require('../controllers/usuario.controller.js');
const proyectoController = require('../controllers/proyecto.controller.js');
const tareaController = require('../controllers/tarea.controller.js');

//Personas
router.post('/personas', personaController.create);
router.get('/personas', personaController.retrieveAllPersonas);
router.get('/personas/:id', personaController.getPersonaById);
router.put('/personas/:id', personaController.updateById);
router.delete('/personas/:id', personaController.deleteById);
router.post('/usuarios', usuarioController.create);

//Usuarios
router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.retrieveAllUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
router.put('/usuarios/:id', usuarioController.updateById);
router.delete('/usuarios/:id', usuarioController.deleteById);

//Proyectos
router.post('/proyectos', proyectoController.create);
router.get('/proyectos', proyectoController.retrieveAllProyectos);
router.get('/proyectos/:id', proyectoController.getProyectoById);
router.put('/proyectos/:id', proyectoController.updateById);
router.delete('/proyectos/:id', proyectoController.deleteById);

//Tarea
router.post('/tareas', tareaController.create);
router.get('/tareas', tareaController.retrieveAllTareas);
router.get('/tareas/:id', tareaController.getTareaById);
router.put('/tareas/:id', tareaController.updateById);
router.delete('/tareas/:id', tareaController.deleteById);

module.exports = router;
