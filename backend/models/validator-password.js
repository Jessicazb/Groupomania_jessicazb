// Validation d'un mot de passe robuste pour la sécurité 
const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    
.is().max(50)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits()                                
.has().not().spaces()                    

module.exports = passwordSchema;