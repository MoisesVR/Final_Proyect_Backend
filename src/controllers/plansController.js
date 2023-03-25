const { showError } = require('../helpers/showError');
const { createPlans, getAllPlans, getPlansId, dropPlans, modifyPlan } = require('../models/plansModel');

const plansRegister = async (req, res) => {
    try {
        const { nombre, duracion, descripcion, costo } = req.body;
        const newPlans= await createPlans(nombre, duracion, descripcion, costo)
        res.json(newPlans);
    } catch (error) {
        console.log(error)
    }
}

const plansModify = async (req, res) => {
    try {
        const { id, nombre, duracion, descripcion, costo } = req.body;
        const plansModified = await modifyPlan(id, nombre, duracion, descripcion, costo)
        res.status.json({
            message: "Plan modificado correctamente",
        });
    } catch (error) {
        console.log(error)
    }
}

const plansDelete = async (req, res) => {
    const { id } = req.body;
    try {
        const plans = await getPlansId(id)
        if (plans[0] === undefined) {
            res.status(404).json({
                message: "Plan no encontrado",
                code: 404,
            });
        } else {
            dropPlans(id)
            res.status(200).json({
                message: "Plan eliminado correctamente",
                code: 200,
                plans,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardAdminPlans = async (req, res) => {
    try {
        const plans = await getAllPlans()
        if (plans[0] === undefined) {
            res.status(404).json({
                message: "No hay Planes",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan los Planes",
                code: 200,
                plans,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

module.exports = { plansRegister, dashboardAdminPlans, plansDelete, plansModify };