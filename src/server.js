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

//rotas
app.get('/', (req, res) => {
    //    res.send('Rota Inicial')
    res.render('login')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.get('/consulta', (req, res) => {
    res.render('consulta')
})

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

// crud usuário
// salva
app.post('/usuario', async (req, res) => {
    try {
        const usuarioExistente = await Usuario.findOne({ email: req.body.email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Já existe um usuário com esse email' });
        }
        const usuario = await Usuario.create(req.body);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});



// busca todos
app.get('/usuario', async (req, res) => {
    try {
        const usuario = await Usuario.find({})
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// busca apenas um
app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findById(id)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// update
app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findByIdAndUpdate(id, req.body)

        // se não encontrou um id correspondente
        if (!usuario) {
            return res.status(404).json({ message: `Usuário não encontrado` })
        }

        // se encontrou
        const usuarioAtualizado = await Usuario.findById(id)
        res.status(200).json(usuarioAtualizado)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete
app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findByIdAndDelete(id)

        // se não encontrou um id correspondente
        if (!usuario) {
            return res.status(404).json({ message: `Usuário não encontrado` })
        }

        // se encontrou
        res.status(200).json(usuario)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// **************************************************************************

//                             CONSULTA

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Registra um consulta
app.post('/consulta', upload.single('file'), async (req, res) => {
    try {
        const consulta = new Consulta({
            email: req.body.email,
            cpf: req.body.cpf,
            nome: req.body.nome,
            tipo_consulta: req.body.tipo_consulta,
            data_hora: req.body.data_hora,
            file: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        await consulta.save();
        res.status(200).json(consulta);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

// Da um get em todas as consultas
app.get('/consultas', async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.status(200).json(consultas);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Da um get em na consulta pelo id e baixa o arquivo nela inserido
app.get('/consultas/:id', async (req, res) => {
    try {
        const consulta = await Consulta.findById(req.params.id);
        if (!consulta) {
            return res.status(404).json({ message: 'Consulta não encontrada' });
        }
        res.set({
            'Content-Type': consulta.file.contentType,
            'Content-Disposition': `attachment; filename=${consulta.nomeArquivo}`,
        });
        res.send(consulta.file.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Atualiza a consulta
app.put('/consulta/:id', upload.single('file'), async (req, res) => {
    try {
        const consulta = await Consulta.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            cpf: req.body.cpf,
            nome: req.body.nome,
            file: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            tipo_consulta: req.body.tipo_consulta,
            data_hora: req.body.data_hora
        }, { new: true });

        if (!consulta) {
            return res.status(404).send('Consulta não encontrada.');
        }

        res.status(200).json(consulta);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Deleta uma Consulta
app.delete('/consulta/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const consulta = await Consulta.findByIdAndDelete(id);
        if (!consulta) {
            return res.status(404).json({ message: 'Consulta não encontrada' });
        }
        return res.status(200).json({ message: 'Consulta deletada com sucesso' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
});


