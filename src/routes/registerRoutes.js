const express = require('express')
const router = express.Router()
const { userRegister, userModify } = require('../controllers/usersController');
const { getUseVerified } = require('../controllers/sessionController');
const { isLogin } = require('../middlewares/isLogin');
const { dashboardAdminUsers, dashboardAdminUserDelete } = require('../controllers/admin/dashboardAdminController');
const { classRegister, classDelete, classModify } = require('../controllers/classController');
const { dashboardAdminClass } = require('../controllers/classController');
const { plansRegister, dashboardAdminPlans, plansDelete, plansModify } = require('../controllers/plansController');
const { dashboardUserEntry, entryRegister, entryDelete } = require('../controllers/entryController');
const { cardRegister, cardDelete, dashboardUserCard } = require('../controllers/cardController');
const { reserveClassRegister, reserveClassDelete, dashboardUserReserveClass } = require('../controllers/reserveClassController');

router.post('/registrar', userRegister);    

router.post('/dashboard/clases', classRegister);    
router.post('/dashboard/planes', plansRegister);    
router.get('/dashboard/clases',/*  isLogin, getUseVerified, */ dashboardAdminClass); 
router.get('/dashboard/planes', /* isLogin, getUseVerified, */ dashboardAdminPlans);  
router.get('/dashboard/usuarios', /* isLogin, getUseVerified, */ dashboardAdminUsers);  
router.delete('/dashboard/usuarios', dashboardAdminUserDelete); 
router.delete('/dashboard/clases', classDelete);    
router.delete('/dashboard/planes', plansDelete);    
router.put('/dashboard/planes', plansModify);   
router.put('/dashboard/clases', classModify);   

router.post('/dashboar_user/ingresos', entryRegister);  
router.post('/dashboard_user/tarjeta', cardRegister);  
router.post('/dashboard_user/clases', reserveClassRegister);    
router.get('/dashboard_user', /* isLogin, getUseVerified,  */dashboardUserEntry);   
router.get('/dashboard_user/tarjeta', /* isLogin, getUseVerified, */ dashboardUserCard);  
router.get('/dashboard_user/clases', dashboardUserReserveClass);    
router.delete('/dashboard_user/ingresos', entryDelete); 
router.delete('/dashboard_user/tarjeta', cardDelete);   
router.delete('/dashboard_user/clases', reserveClassDelete);    
router.put('/dashboard_user/datos', userModify);    

router.get('*', (req, res) => {
    res.status(400).send("Esta ruta no existe");
});

module.exports = router;