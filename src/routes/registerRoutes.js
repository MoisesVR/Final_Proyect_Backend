const express = require('express')
const router = express.Router()
const { userRegister, userModify, userGetted } = require('../controllers/usersController');
const { getUseVerified } = require('../controllers/sessionController');
const { isLogin } = require('../middlewares/isLogin');
const { dashboardAdminUsers, dashboardAdminUserDelete } = require('../controllers/admin/dashboardAdminController');
const { classRegister, classDelete, classModify } = require('../controllers/classController');
const { dashboardAdminClass } = require('../controllers/classController');
const { plansRegister, dashboardAdminPlans, plansDelete, plansModify } = require('../controllers/plansController');
const { dashboardUserEntry, entryRegister, entryDelete, dashboardEntryUserRegistered    } = require('../controllers/entryController');
const { cardRegister, cardDelete, dashboardUserCard } = require('../controllers/cardController');
const { reserveClassRegister, reserveClassDelete, dashboardUserReserveClass, dashboardUserReserveAllClass } = require('../controllers/reserveClassController');
const { loginUser } = require('../controllers/loginController');

router.post('/iniciarSesion', loginUser);
router.get('/planes', dashboardAdminPlans);
router.get('/clases', dashboardAdminClass);

router.post('/registrar', userRegister);    

router.post('/dashboard/clases', classRegister, isLogin, getUseVerified);    
router.post('/dashboard/planes', plansRegister, isLogin, getUseVerified );    
router.get('/dashboard/clases', dashboardAdminClass, isLogin, getUseVerified); 
router.get('/dashboard/planes', dashboardAdminPlans, isLogin, getUseVerified);  
router.get('/dashboard/usuarios', dashboardAdminUsers, isLogin, getUseVerified);  
router.delete('/dashboard/usuarios/:id', dashboardAdminUserDelete, isLogin, getUseVerified); 
router.delete('/dashboard/clases', classDelete, isLogin, getUseVerified);    
router.delete('/dashboard/planes/:id', plansDelete, isLogin, getUseVerified);    
router.put('/dashboard/planes', plansModify, isLogin, getUseVerified);       
router.put('/dashboard/clases', classModify, isLogin, getUseVerified);   

router.post('/dashboard_user/ingresos', entryRegister, isLogin, getUseVerified);  
router.post('/dashboard_user/tarjeta', cardRegister, isLogin, getUseVerified);  
router.post('/dashboard_user/clases', reserveClassRegister, isLogin, getUseVerified);
router.post('/dashboard_user/usuarios', userGetted, isLogin, getUseVerified);    
router.get('/dashboard_user/tarjeta', dashboardUserCard, isLogin, getUseVerified);  
router.get('/dashboard_user/ingresos/:id', dashboardEntryUserRegistered, isLogin, getUseVerified);   
router.get('/dashboard_user/clases/:id', dashboardUserReserveClass, isLogin, getUseVerified);
router.get('/dashboard_user/clases', dashboardUserReserveAllClass, isLogin, getUseVerified)    
router.delete('/dashboard_user/ingresos/:id', entryDelete, isLogin, getUseVerified); 
router.delete('/dashboard_user/tarjeta', cardDelete, isLogin, getUseVerified);   
router.delete('/dashboard_user/clases/:id', reserveClassDelete, isLogin, getUseVerified);    
router.put('/dashboard_user/datos', userModify, isLogin, getUseVerified);


router.get('*', (req, res) => {
    res.status(400).send("Esta ruta no existe");
});

module.exports = router;