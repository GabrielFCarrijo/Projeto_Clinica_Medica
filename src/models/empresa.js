const mongoose = require('mongoose')

const empresaSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Informe um nome"],
            unique: true
        },
        endereco: {
            type: String,
            required: [true, "Informe uma endereco"]
        },
        horaAbertura: {
            type: String,
            required: [true, "Informe a hora de abertura"]
        },
        horaFechamento: {
            type: String,
            required: [true, "Informe a hora de fechamento"]
        },
        cnpj: {
            type: String,
            required: [true, "Informe o cnpj"]
        },
        nomeFantasia: {
            type: String,
            required: [true, "Informe o nome fantasia"]
        },
        razaoSocial: {
            type: String,
            required: [true, "Informe a Razão Social"]
        }
    },
    {
        timestamps: true
    }
)

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
