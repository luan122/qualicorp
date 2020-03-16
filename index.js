var app = require('./config/express')();

app.listen(80,function(){
    console.log("Servidor rodando");
});