const { getUseVerify } = require('../models/usersModel');

const getUseVerified = async (req, res) => {
    const email = req.user.email
    try {
        const user = await getUseVerify(email);
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUseVerified }