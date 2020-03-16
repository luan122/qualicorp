const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("admin", "admin123"));
const session = driver.session();

module.exports = function(app){
    app.get('/cliente/listar', function(req,res){
        listarclentes().then(retorno => {
            res.send(retorno);
        });
    });

    app.post('/cliente/salvar', function(req,res){
        salvarCliente(req.body).then(retorno => {
            console.log(retorno);
            res.send(retorno);
        });
    });

    app.get('/cliente/:id',function(req,res){
        buscarCliente(req.params.id).then(retorno => {
            res.send(retorno);
        });
    })
}

function salvarCliente(client){
    const session = driver.session()
    return session
        .run('CREATE (a:Client {nome: $nome, rg: $rg, cpf: $cpf})', { nome: client.nome, rg: client.rg, cpf: client.cpf })
        .then(result => {
            session.close();
            return result;
        });
}
function listarclentes(){
    const session = driver.session()
    return session
        .run('MATCH (a:Client) return a')
        .then(result => {
            result = result.records.map(r => r.get('a')['properties'])
            session.close();
            return result;
        });
}
function buscarCliente(id){
    const session = driver.session()
    return session
        .run('MATCH (a:Client) WHERE ID(a) = toInteger($id) return a', {id: id})
        .then(result => {
            result = result.records.map(r => r.get('a')['properties'])
            session.close();
            return result;
        });
}