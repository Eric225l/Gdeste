require("dotenv").config();

//Puxa as funções do arquivo conexãoDatabase

const database = require("./conexaoDatabase");

//Bibliotecas

const express = require("express");
const cors = require("cors");

//Servidor com biblioteca express e porta vinda do arquivo .env

const server = express();
const port = process.env.PORT;

//Termos para conectar com o Site

server.use(cors({
    origin: "*",
    method: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
}));

server.use(express.json());

/*Rotas de requisção para os membros*/

//Rota de listagem de membros

server.get("/sistema/membros", async (req, res)=>{
    const members = await database.databaseVisualizeMember();
    res.json(members);
})

//Rota de adição de membros

server.post("/sistema/membros", async (req, res)=>{
    await database.databaseInsertMember(req.body);
    res.status(201).json({message: "Dados criados"});
})

//Rota de exclusão de membros

server.ddee("/sistema/membros/:id", async (req, res)=>{
    await database.databaseDeleteMember(req.params.id);
    res.status(204).json({message: "Dados deletados"});
})

//Rota de edição de informações de membros

server.patch("/sistema/membros/:id", async (req, res)=> {
    await database.databaseUpdateMember(req.params.id, req.body);
    res.status(200).json({message:"Dados atualizados"});
})

/*Rotas de requisição para as publicações */

//Rota de listagem de publicações

server.get("/sistema/publicacoes", async (req, res)=>{
    const publications = await database.databaseVisualizePublication();
    res.json(publications);
})

//Rota de adição de membros

server.post("/sistema/publicacoes", async (req, res)=>{
    await database.databaseInsertPublication(req.body);
    res.status(201).json({message: "Dados criados"});
})

//Rota de exclusão de membro

server.delete("/sistema/publicacoes/:id", async (req, res)=>{
    await database.databaseDeletePublication(req.params.id);
    res.status(204).json({message: "Dados deletados"});
})

//Rota de edição de informações de membros

server.patch("/sistema/publicacoes/:id", async (req, res)=>{
    await database.databaseUpdatePublication(req.params.id, req.body)
    res.status(200).json({message: "Dados atualizados"});
})

//Conexão com a porta de envio de informações

server.listen(port, ()=>{
    console.log("Servidor abriu");
});