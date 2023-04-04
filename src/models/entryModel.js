const res = require("express/lib/response");

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

const getAllEntryUser = async (id) => {
    try {
        const query = {
            text: "SELECT id, date, hour FROM entry WHERE id_user = $1", /* , SELECT entry.date, entry.hour, entry.id_user, users.id FROM entry INNER JOIN users ON entry.id_user = $1 AND users.id = $1 */
            values: [parseInt(id)],
        }
        const result = await pool.query(query);
        console.log("result model->", result)

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
                message: "Ingreso no encontrado en el delete",
                values,
            };
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

module.exports = { getAllEntry, getEntryId, createEntry, dropEntry, getAllEntryUser };