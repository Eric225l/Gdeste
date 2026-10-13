require("dotenv").config();

const database = require("./conexaoDatabase");
const express = require("express");
const cors = require("cors");

const server = express();
const port = process.env.PORT;

server.use(cors({
    origin: "*",
    method: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus:200
}));

server.use(express.json());

/*Rotas de requisção para os membros*/

server.get("/sistema/membros", async (req, res)=>{
    const members = await database.databaseVisualizeMember();
    res.json(members);
})

server.post("/sistema/membros", async (req, res)=>{
    await database.databaseInsertMember(req.body);
    res.status(201).json({message: "Dados criados"});
})

server.delete("/sistema/membros/:id", async (req, res)=>{
    await database.databaseDeleteMember(req.params.id);
    res.status(204).json({message: "Dados deletados"});
})

server.patch("/sistema/membros/:id", async (req, res)=> {
    await database.databaseUpdateMember(req.params.id, req.body);
    res.status(200).json({message:"Dados atualizados"});
})

/*Rotas de requisição para as publicações */

server.get("/sistema/publicacoes", async (req, res)=>{
    const publications = await database.databaseVisualizePublication();
    res.json(publications);
})

server.post("/sistema/publicacoes", async (req, res)=>{
    await database.databaseInsertPublication(req.body);
    res.status(201).json({message: "Dados criados"});
})

server.delete("/sistema/publicacoes/:id", async (req, res)=>{
    await database.databaseDeletePublication(req.params.id);
    res.status(204).json({message: "Dados deletados"});
})

server.patch("/sistema/publicacoes/:id", async (req, res)=>{
    await database.databaseUpdatePublication(req.params.id, req.body)
    res.status(200).json({message: "Dados atualizados"});
})

server.listen(port, ()=>{
    console.log("Servidor abriu");
});