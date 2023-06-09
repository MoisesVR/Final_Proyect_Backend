const { showError } = require('../helpers/showError');
const { createEntry, getEntryId, dropEntry, getAllEntry, getAllEntryUser } = require('../models/entryModel');

const entryRegister = async (req, res) => {
    try {
        const { hora, fecha, id_user } = req.body;
        const newEntry = await createEntry(hora, fecha, id_user)
        res.json(newEntry);
    } catch (error) {
        console.log(error)
    }
}

const entryDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await getEntryId(id)
        if (entry === undefined) {
            res.status(404).json({
                message: "Ingreso no encontrado en el controller",
                code: 404,
            });
        } else {
            dropEntry(id)
            res.status(200).json({
                message: "Ingreso eliminado correctamente",
                code: 200,
                entry,
                id,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardUserEntry = async (req, res) => {
    try {
        const entry = await getAllEntry()
        if (entry[0] === undefined) {
            res.status(404).json({
                message: "No hay reservas",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan las reservas",
                code: 200,
                entry,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardEntryUserRegistered = async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await getAllEntryUser(id)
        if (entry === null) {
            res.status(404).json({
                message: "No hay reservas",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan las reservas",
                code: 200,
                entry,
            });
        }
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = { entryRegister, entryDelete, dashboardUserEntry, dashboardEntryUserRegistered };