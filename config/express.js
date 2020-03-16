const express = require("express");
const consign = require("consign");

module.exports = function(){
    var app = express();
    app.use(express.json());
    consign()
        .include('controllers')
        .into(app);
    return app;
}