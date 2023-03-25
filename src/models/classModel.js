const pool = require("../db/db").pool;

const getAllClass = async () => {
    try {
        const consult = "SELECT * FROM class";
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const getClassId = async (id) => {
    try {
        const consult = "SELECT id FROM class where id = $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ninguna clase con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }

}

const createClass = async (nombre, img, alt, descripcion, cupo, user_in_charge) => {
    try {
        const consult = "INSERT INTO class ( name, img, alt, description, cupo, user_in_charge) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [nombre, img, alt, descripcion, cupo, user_in_charge];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se pudo crear la clase",
            };
        }
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

const modifyClass = async (id, nombre, img, alt, descripcion, cupo, user_in_charge) => {
    try {
        const consult = `UPDATE class SET name='${nombre}', img='${img}', alt='${alt}', description='${descripcion}', cupo=${cupo}, user_in_charge=${user_in_charge} WHERE id=${id};`;
        const values = [];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if(!rowCount){
            throw {
                code: 404,
                message: "No se pudo modificar la clase",
            };
        }

        return result.rows;

    } catch (error) {
        console.log(error);
    }
};

const dropClass = async (id) => {
    try {
        const consult = "DELETE from class where id= $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "Clase no encontrada",
            };
        return result.rows
    } catch (error) {
        console.log(error);
    }

}

module.exports = { getAllClass, createClass, getClassId, dropClass, modifyClass };