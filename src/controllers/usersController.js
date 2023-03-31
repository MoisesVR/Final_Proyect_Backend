const { createUser, modifyUser, getUseVerify } = require('../models/usersModel')

const userRegister = async (req, res) => {
    try {
        const { nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan } = req.body;
        const newUser = await createUser(nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan)
        res.json(newUser);
    } catch (error) {
        console.log(error)
    }
}

const userGetted = async (req, res) => {
    const {email} = req.body;
    try {
        const gettedUser = await getUseVerify(email)
        if (gettedUser === undefined) {
            res.status(404).json({
                message: "Usuario no encontrado",
                code: 404,
            })
        } else {
            res.status(200).json({
                message: "Usuario encontrado",
                code: 200,
                gettedUser,
            });
        }
    } catch (error) {
        console.log(error)
    }
}

const userModify = async (req, res) => {
    try {
        const { id, nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan } = req.body;
        const userModified = await modifyUser(id, nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan)
        res.status(200).json({
            message: "Usuario Modificado con exito",
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { userRegister, userModify, userGetted };