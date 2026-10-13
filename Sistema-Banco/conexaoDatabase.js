const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

async function conectionDatabase(){  
    try{
        const client = await pool.connect();
        return client;

    }catch(err){
        console.log(`ERRO de conexão: ${err}`)
        throw err;
    }
    
}

async function databaseInsertMember(user){
    let client;
    try{
        client = await conectionDatabase();
        const sql = "INSERT INTO membros(nome, time, curso, status, lattes) VALUES ($1, $2, $3, $4, $5)";
        const values = [user.nome, user.time, user.curso, user.status, user.lattes];
        const res = await client.query(sql, values);
    }catch(err){
        console.log(`ERRO de operação post: ${err}`)
        throw err;
    }finally{
        if(client){
            client.release();
        }
    }
    
}

async function databaseVisualizeMember(){
    let client;
    try{
        client = await conectionDatabase();
        const sql = "SELECT * FROM membros ORDER BY id";
        const res = await client.query(sql);
        return res.rows;
    }catch(err){
        console.log(`ERRO de operação get: ${err}`);
        throw err;
    }finally{
        if(client){
            client.release();
        }
    }
    
}

async function databaseDeleteMember(id){
    let client;
    try{
        client = await conectionDatabase();
        const sql = "DELETE FROM membros WHERE id=$1";
        const values = [id];
        const res = await client.query(sql, values);
    }catch(err){
        console.log(`ERRO de operação delete: ${err}`);
    }finally{
        if(client){
            client.release();
        }
    }
    
}

async function databaseUpdateMember(id, user){
    let client;
    try{
        client = await conectionDatabase();
        const sql = "UPDATE membros SET nome=$1, time=$2, curso=$3, status=$4, lattes=$5 WHERE id=$6"
        const values = [user.nome, user.time, user.curso, user.status, user.lattes, id];
        const res = await client.query(sql, values);

    }catch(err){
         console.log(`ERRO de operação patch: ${err}`);
    }finally{
        if(client){
            client.release()
        }
    }
}

/*Querys da tabela de publicações publicações */

async function databaseVisualizePublication(){
    let client;
    try{
        client = await conectionDatabase();
        const sql = "SELECT * FROM publicacoes ORDER BY id";
        const res = await client.query(sql);
        return res.rows;
    }catch(err){
        console.log(`ERRO de operação get puclicação: ${err}`);
        throw err;
    }finally{
        if(client){
            client.release();
        }
    }
}

async function databaseInsertPublication(publi){
    let client;
    
    try{
        client = await conectionDatabase();
        const sql = "INSERT INTO publicacoes(tipo, local, ano, titulo, texto) VALUES ($1, $2, $3, $4, $5)";
        const values = [publi.tipo, publi.local, publi.ano, publi.titulo, publi.texto];
        const res = await client.query(sql, values);

    }catch(err){
        console.log(`Erro de operação post Publicação: ${err}`);
        throw err;
    }finally{
        if(client){
            client.release();
        }
    }
}

async function databaseDeletePublication(id){
    let client;

    try{
        client = await conectionDatabase();
        const sql = "DELETE FROM publicacoes WHERE id=$1";
        const values = [id];
        const res = await client.query(sql, values)
    }catch(err){
        console.log(`Erro de operação delete publication: ${err}`);
        throw err;
    }finally{
        if(client){
            client.release();
        }
    }
}

async function databaseUpdatePublication(id, user){
    let client;
    
    try{
        client = await conectionDatabase();
        const sql = "UPDATE publicacoes SET tipo=$1, local=$2, ano=$3, titulo=$4, texto=$5 WHERE id=$6";
        const values = [user.tipo, user.local, user.ano, user.titulo, user.texto, id];
        const res = await client.query(sql, values);
    }catch(err){
        console.log(`ERRO de operação patch publication: ${err}`);
        throw err;
    }finally{
        if(client){
            client.release();
        }
    }
}

module.exports = {
    databaseInsertMember,
    databaseVisualizeMember,
    databaseDeleteMember,
    databaseUpdateMember,
    databaseInsertPublication,
    databaseVisualizePublication,
    databaseDeletePublication,
    databaseUpdatePublication
}