// Nota: Para iniciar o servidor: abrir a pasta src no terminal e rodar o comando npm run dev

const express = require('express') // O express permite que não seja necessário reiniciar a aplicação à cada alteração feita
const app = express()
const cors = require('cors');   // Adicionado o cors para conversar com o front
const mongoose = require('mongoose') // O mongoose é usado para fazer a conexão no banco de dados
const Usuario = require('./models/usuario')
const Consulta = require('./models/consulta');

const path = require('path')
const hbs = require('hbs')
const { collection } = require('./models/usuario')
const templatePath = path.join(__dirname, '../templates')

// Conectando ao banco
mongoose.connect('mongodb+srv://admin:Pi12345678@medical.b5row3q.mongodb.net/Medical?retryWrites=true&w=majority').then(() => {
    console.log(`Conectado ao MongoDB`)
    // Iniciando o Node
    app.listen(5000, () => {
        // Mudança de porta, pois o React usa a 3000
        console.log(`Rodando na porta 5000`)
    })
}).catch((error) => { // Se o mongoose não conseguir fazer o login no banco, dispara o erro
    console.log(error)
})

app.use(express.json())
app.set('view engine', 'hbs')
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))
app.use(cors({  // Configurando o cors
    credentials: true,
    optionsSuccessStatus: 200
}))

// login
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email })

        if (check.senha === req.body.senha) {
            res.render('home')
        } else {
            res.send('Senha Incorreta')
        }
    } catch (error) {
        res.send('Login inválido')
    }
})

app.post('/cadastro', async (req, res) => {
    try {
        const usuario = {
            nome: req.body.nome,
            senha: req.body.senha
        }
        await Usuario.create(req.body)
        res.render("home")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

const usuarioRouter = require('./routes/usuario')
app.use('/usuario', usuarioRouter)
