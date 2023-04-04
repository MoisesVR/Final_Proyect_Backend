const pool = require("../db/db").pool;

const getAllReserveClass = async () => {
    try {
        const consult = "SELECT * FROM class";
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

const getReserveClassId = async (id) => {
    try {
        const query = {
            text: "SELECT class_reserve.id, class_reserve.date, class_reserve.hour, class.name, class_reserve.id FROM class_reserve INNER JOIN class ON class.id = class_reserve.id_class WHERE class_reserve.id = $1",
            values: [id],
        }
        const result = await pool.query(query);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró reserva de clase con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

const createReserveClass = async (fecha, hora, id_user, id_class) => {
    try {
        const consult = "INSERT INTO class_reserve ( date, hour, id_user, id_class) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [fecha, hora, id_user, id_class];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se pudo crear la reserva de clase",
            };
        }
        return result.rows
    } catch (error) {
        console.log(error);
    }
}

const dropReserveClass = async (id) => {
    try {
        const consult = "DELETE from class_reserve where id= $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "Reserva de clase no encontrada",
            };
        return result.rows
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllReserveClass, getReserveClassId, createReserveClass, dropReserveClass }