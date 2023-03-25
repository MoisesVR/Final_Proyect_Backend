const { getAllUsers, getUserId, dropUser } = require('../../models/usersModel');
const { showError } = require('../../helpers/showError');

const dashboardAdminUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        if (users[0] === undefined) {
            res.status(404).json({
                message: "No hay usuarios",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan los usuarios",
                code: 200,
                users,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardAdminUserDelete = async (req, res) => {
    const { id } = req.body;
    try {
        const users = await getUserId(id)
        if (users[0] === undefined) {
            res.status(404).json({
                message: "Usuario no encontrado",
                code: 404,
            });
        } else {
            dropUser(id)
            res.status(200).json({
                message: "Usuario eliminado correctamente",
                code: 200,
                users,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}



module.exports = { dashboardAdminUsers, dashboardAdminUserDelete };