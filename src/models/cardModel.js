const pool = require("../db/db").pool;

const getAllCard = async () => {
    try {
        const consult = "SELECT * FROM card";
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const getCardId = async (id) => {
    try {
        const consult = "SELECT id FROM card where id = $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ninguna tarjeta con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const createCard = async (titular, numero, f_vencimiento, cod_seg, id_user) => {
    try {
        const consult = "INSERT INTO card ( titular, num_tarjeta, due_date, security_code, id_user) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [titular, numero, f_vencimiento, cod_seg, id_user];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se pudo crear la tarjeta",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const dropCard = async (id) => {
    try {
        const consult = "DELETE from card where id= $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "Tarjeta no encontrada",
            };
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

module.exports = { getAllCard, getCardId, createCard, dropCard };