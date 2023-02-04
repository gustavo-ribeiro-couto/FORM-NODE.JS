/* npm i init

"start": "nodemon ./index.js localhost 3000"

npm i nodemon

npm i express

npm i express-handlebars

npm i mysql */



const express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('home')
})

app.post('/lendas/insertlendas', (req, res) =>{
    const nome = req.body.nome
    const posicao = req.body.posicao

    const sql = `INSERT INTO lendas (nome, posicao) VALUES ('${nome}', '${posicao}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/lendas', (req,res) =>{
    const sql = ' SELECT * FROM lendas'

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const lendas = data
        console.log(lendas)
        res.render('lendas',{lendas})

    })
})

app.get('/lendas/:id', (req,res) =>{

    const id = req = req.params.id
    
    const sql = (`SELECT * FROM  lendas where id =${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const lenda = data[0]

        res.render('lenda', {lenda})
    })
})

app.get('/lendas/edit/:id', (req,res) =>{
    const id = req.params.id
    const sql = (`SELECT * FROM lendas WHERE id = ${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const lenda = data[0]

        res.render('editlenda', {lenda})
    })
})

app.post('/lendas/updatelenda', (req, res) =>{

    const id = req.body.id
    const nome = req.body.nome
    const posicao = req.body.posicao
    
    const sql = (`UPDATE lendas SET nome = '${nome}', posicao = '${posicao}' WHERE  id = ${id}`)


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/lendas')
    })
})


app.post('/lendas/remove/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM lendas WHERE id = ${id}`


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/lendas')
    })

})



const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'blog_de_esporte'

})

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('conectou com DB')

    app.listen(3000)
})