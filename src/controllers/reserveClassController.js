const { showError } = require('../helpers/showError');
const { createReserveClass, getAllReserveClass, dropReserveClass } = require('../models/reserveClassModel');

const reserveClassRegister = async (req, res) => {
    try {
        const { fecha, hora, id_user, id_class } = req.body;
        const newReserveClass = await createReserveClass(fecha, hora, id_user, id_class);
        res.json(newReserveClass);
    } catch (error) {
        console.log(error)
    }
}

const reserveClassDelete = async (req, res) => {
    const { id } = req.body;
    try {
        const reserveClass = await getAllReserveClass(id)
        if (reserveClass[0] === undefined) {
            res.status(404).json({
                message: "Reserva de Clase no encontrada",
                code: 404,
            });
        } else {
            dropReserveClass(id)
            res.status(200).json({
                message: "Reserva de Clase eliminada correctamente",
                code: 200,
                reserveClass,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardUserReserveClass = async (req, res) => {
    try {
        const reserveClass = await getAllReserveClass()
        if (reserveClass[0] === undefined) {
            res.status(404).json({
                message: "No hay reservas de clases",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan las reservas de clases",
                code: 200,
                reserveClass,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

module.exports = { reserveClassRegister, reserveClassDelete, dashboardUserReserveClass };