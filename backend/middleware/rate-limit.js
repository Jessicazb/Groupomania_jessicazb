// limiter la demande de l'utilisateur
const rateLimit  = require('express-rate-limit');

const  limiteur  =  rateLimit ({ 
	windowMs : 2  *  60  *  1000 ,  
	max : 3 ,  
	standardHeaders : true ,  
	legacyHeaders : false ,  
    message: 'Trop de tentatives de connexion. Compte bloqué pour 15 minutes.'
})

module.exports = { limiteur }