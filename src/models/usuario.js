const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Informe um email"],
            unique: true
        },
        cpf: {
            type: String,
            required: [true, "Informe uma cpf"]
        },
        nome: {
            type: String,
            required: [true, "Informe um nome"]
        },
        senha: {
            type: String,
            required: [true, "Informe uma senha"]
        },
        tipo: {
            type: String,
            required: [true],
            default: "P"
        }
    },
    {
        timestamps: true
    }
)

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
