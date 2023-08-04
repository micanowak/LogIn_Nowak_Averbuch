import express from "express";
import cors from 'cors';
import Usuario from "./Usuario";

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

const User = new Usuario(1, "mica", "mica12");

app.post('/logIn', async (req, res) => {
    console.log("en post, req:", req)
    console.log(req.body);
    let username = req.body.username;
	let password = req.body.password;
    try {
        console.log(req);
        if(username===User.username && password===User.password){
            res.status = 200;
            res.send("Está ok");
        } else {
            res.send("No está ok");
            res.status = 500;
        }
    } catch (error) {
        console.error("error", error);
    }
})