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

    static getUsuarioById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: bdSer.getUserById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('Select * from Usuario where id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateUsuarioInfo = async (id, Usuario) => {
        let returnEntity = null;
        console.log('Estoy en: BD_Servicies.updateUsuarioInfo(id, Usuario)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('pApe', Usuario.Apellido)
                .input('pNom', Usuario.Nombre)
                .query("UPDATE Usuario SET Apellido=@pApe, nombre=@pNom WHERE id = @pId");
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}

