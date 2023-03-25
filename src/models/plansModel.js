const pool = require("../db/db").pool;

const getAllPlans = async () => {
    try {
        const consult = "SELECT * FROM plans";
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const getPlansId = async (id) => {
    try {
        const consult = "SELECT id FROM plans where id = $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ningun plan con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const createPlans = async (nombre, duracion, descripcion, costo) => {
    try {
        const consult = "INSERT INTO plans ( name, duration, description, cost) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [nombre, duracion, descripcion, costo];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se pudo crear el plan",
            };
        }
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

const modifyPlan = async ( id, nombre, duracion, descripcion, costo) => {
    try {
        const consult = `UPDATE plans SET name='${nombre}', duration='${duracion}', description='${descripcion}', cost=${costo} WHERE id=${id};`
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;

    } catch (error) {
        console.log(error);
    }
};

const dropPlans = async (id) => {
    try {
        const consult = "DELETE from plans where id= $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "Plan no encontrado",
            };
            
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

module.exports = { getAllPlans, createPlans, getPlansId, dropPlans, modifyPlan };