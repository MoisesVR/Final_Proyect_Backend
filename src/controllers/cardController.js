const { showError } = require('../helpers/showError');
const { createCard, getCardId, dropCard, getAllCard } = require('../models/cardModel');

const cardRegister = async (req, res) => {
    try {
        const { titular, numero, f_vencimiento, cod_seg, id_user} = req.body;
        const newCard = await createCard(titular, numero, f_vencimiento, cod_seg, id_user)
        res.json(newCard);
    } catch (error) {
        console.log(error)
    }
}

const cardDelete = async (req, res) => {
    const { id } = req.body;
    try {
        const card = await getCardId(id)
        if (card[0] === undefined) {
            res.status(404).json({
                message: "Tarjeta no encontrada",
                code: 404,
            });
        } else {
            dropCard(id)
            res.status(200).json({
                message: "Tarjeta eliminada correctamente",
                code: 200,
                card,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const dashboardUserCard = async (req, res) => {
    try {
        const card = await getAllCard()
        if (card[0] === undefined) {
            res.status(404).json({
                message: "No hay Tarjetas",
                code: 404,
            });
        } else {
            res.status(200).json({
                message: "Aqui estan las Tarjetas",
                code: 200,
                card,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

module.exports = { cardRegister, cardDelete, dashboardUserCard };