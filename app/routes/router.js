const express = require('express');
const router = express.Router();
const personaController = require('../controllers/persona.controller.js');

// Ruta para crear una nueva Persona (POST)
router.post('/personas', personaController.create);

// Ruta para obtener todas las Personas (GET)
router.get('/personas', personaController.retrieveAllPersonas);

// Ruta para obtener una Persona por su ID (GET)
router.get('/personas/:id', personaController.getPersonaById);

// Ruta para actualizar una Persona por su ID (PUT)
router.put('/personas/:id', personaController.updateById);

// Ruta para eliminar una Persona por su ID (DELETE)
router.delete('/personas/:id', personaController.deleteById);

module.exports = router;
