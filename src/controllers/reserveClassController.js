const { showError } = require('../helpers/showError');
const { createReserveClass, getReserveClassId, dropReserveClass, getAllReserveClass } = require('../models/reserveClassModel');

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
    const { id } = req.params;
    try {
        const reserveClass = await getReserveClassId(id)
        if (reserveClass === undefined) {
            res.status(404).json({
                message: "Reserva de Clase no encontrada Clase",
                code: 404,
                id,
            });
        } else {
            dropReserveClass(id)
            res.status(200).json({
                message: "Reserva de Clase eliminada correctamente",
                code: 200,
                id,
                reserveClass,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardUserReserveAllClass = async (req,res) => {
    try {
        const reserveClass = await getAllReserveClass()
        if (reserveClass === undefined) {
            res.status(404).json({
                message: "No hay reservas de clases aqui entra",
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
        alert(error)
    }
}

const dashboardUserReserveClass = async (req, res) => {
    const  {id}   = req.params;
    console.log("id", id)
    try {
        const reserveClass = await getReserveClassId(id)
        if (reserveClass[0] === undefined) {
            res.status(404).json({
                message: "No hay reservas de clases",
                code: 404,
                id,
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

module.exports = { reserveClassRegister, reserveClassDelete, dashboardUserReserveClass, dashboardUserReserveAllClass };