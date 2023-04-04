const { showError } = require('../helpers/showError');
const { createClass, getAllClass, getClassId, dropClass, modifyClass } = require('../models/classModel');

const classRegister = async (req, res) => {
    try {
        const { nombre, img, alt, descripcion, cupo } = req.body;
        const newClass = await createClass(nombre, img, alt, descripcion, cupo )
        res.json(newClass);
    } catch (error) {
        console.log(error)
    }
}

const classModify = async (req, res) => {
    try {
        const { id, nombre, img, alt, descripcion, cupo } = req.body;
        const classModificar = await modifyClass(id, nombre, img, alt, descripcion, cupo )
        res.status(200).json({
            message: "Clase modifica con exito",
        })
    } catch (error) {
        console.log(error)
    }
}

const classDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const clases = await getClassId(id)
        if (clases[0] === undefined) {
            res.status(404).json({
                message: "Clase no encontrada",
                code: 404,
            });
        } else {
            dropClass(id)
            res.status(200).json({
                message: "Clase eliminada correctamente",
                code: 200,
                clases,
            });
            
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardAdminClass = async (req, res) => {
    try {
        const clases = await getAllClass()
        if (clases[0] === undefined) {
            res.status(404).json({
                message: "No hay clases",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan las clases",
                code: 200,
                clases,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

module.exports = { classRegister, dashboardAdminClass, classDelete, classModify };