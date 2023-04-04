const pool = require("../db/db").pool;
const bcrypt = require("bcryptjs");

const getUseVerify = async (email) => {
    console.log("email->", email)
    try {
        const query = {
            text: "SELECT * FROM users WHERE email = $1",
            values: [email],
        }
        const result = await pool.query(query);

        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ningún usuario con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async () => {
    try {
        const consult = "SELECT * FROM users";
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const getUser = async (email, password) => {
    try {
        const consult = "SELECT * FROM users where email = $1";
        const values = [email];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ningún usuario con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const getUserId = async (id) => {
    try {
        const consult = "SELECT * FROM users where id = $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "No se encontró ningún usuario con estas credenciales",
            };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan) => {
    try {
        const passwordEncrypted = bcrypt.hashSync(password);
        const consult = "INSERT INTO users ( name, email, password, address, payment_type, id_user_type, id_plan) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
        const values = [nombre, email, passwordEncrypted, direccion, forma_de_pago, id_user_type, id_plan];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "No se pudo crear el usuario",
            };
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const modifyUser = async (id, nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan) => {
    try {
        const passwordEncrypted = bcrypt.hashSync(password);
        const consult = `UPDATE users SET name='${nombre}', email='${email}', password='${passwordEncrypted}', address='${direccion}', payment_type='${forma_de_pago}', id_user_type=${id_user_type}, id_plan=${id_plan} WHERE id=${id};`
        const result = await pool.query(consult);
        const rowCount = result.rowCount;

        return result.rows;

    } catch (error) {
        console.log(error);
    }
};

const dropUser = async (id) => {
    try {
        const consult = "DELETE from users where id= $1";
        const values = [id];
        const result = await pool.query(consult, values);
        const rowCount = result.rowCount;

        if (!rowCount)
            throw {
                code: 404,
                message: "Usuario no encontrado",
            };
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUser, createUser, getUseVerify, getAllUsers, dropUser, getUserId, modifyUser }