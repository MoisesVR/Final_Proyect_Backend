const pool = require("../db/db").pool;

const getAllEntry = async () => {
    try {
        const consult = "SELECT * FROM entry";
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const getEntryId = async (id) => {

    try {
        const consult = "SELECT id FROM entry where id = $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ningun ingreso con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const createEntry = async (hora, fecha, id_user) => {
    try {
        const consult = "INSERT INTO entry ( hour, date, id_user) VALUES ($1, $2, $3) RETURNING *";
        const values = [hora, fecha, id_user];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se pudo crear la reserva",
            };
        }
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

const dropEntry = async (id) => {
    try {
        const consult = "DELETE from entry where id= $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "Ingreso no encontrado",
            };
        return result.rows
    } catch (error) {
        console.log(error);
    }   

}

module.exports = { getAllEntry, getEntryId, createEntry, dropEntry };