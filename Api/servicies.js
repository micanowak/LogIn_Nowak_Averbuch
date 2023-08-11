import config from './dbconfig.js';
import sql from 'mssql';

export class BD_Servicies {
    
    static logInFunction = async (username, password) => {
        let returnEntity = null;
        console.log('Estoy en: BD.logInFunction(username, password)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', username)
                .input('pContra', password)
                .query('SELECT * FROM Usuario WHERE username = @pNombre and password = @pContra');
                returnEntity = result.recordsets[0][0];
            console.log(returnEntity);
        } catch (error) {
            console.log(error.message);
        }
        return returnEntity;
    }

    static insertUsuario = async (usuario) => {
        let returnEntity = null;
        console.log('Estoy en: BD.insertUsuario(Evento)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNom', usuario.username)
                .input('pPass', usuario.password)
                .query('INSERT INTO Usuario (username, password) VALUES (@pNom, @pPass)');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}