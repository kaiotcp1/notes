// configurações
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// Importação de rotas
const notesRoutes = require('./routes/notes');

const app = express();
const port = 8000;
const server = "Servidor:";

// DB
const db = require('./db/connection');


// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
res.render('home')});

app.use('/notes', notesRoutes)

db.initDb((err, db) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${server} O banco conectou com sucesso`)
        app.listen(port, () => {
            console.log(`${server} Projeto rodando na porta: ${port}`);
        });
    }
})

