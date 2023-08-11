import express from "express";
import cors from 'cors';
import { BD_Servicies } from "./servicies";

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.post('/logInUsuario', async (req, res) => {
    console.log("en post, req:", req)
    console.log(req.body);
    let username = req.body.username;
	let password = req.body.password;
    try {
        console.log(req);
        const results = await BD_Servicies.logInFunction(username, password);
        console.log("results", results);
        if(results) {
            res.status(200).json({ message: 'Usuario Verificado' });
            console.log(results);
        } else {
            console.log("No encontrado");
            res.status(401).json('Nombre de usuario y/o contraseña incorrecta');
            console.log(results);
        }
        
    } catch (error) {
        console.error("error", error);
    }
})