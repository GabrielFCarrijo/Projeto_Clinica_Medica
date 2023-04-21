const mongoose = require('mongoose')

const consultaSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Informe um email"]
        },
        cpf: {
            type: String,
            required: [true, "Informe uma cpf"]
        },
        nome: {
            type: String,
            required: [true, "Informe um nome"]
        },
        file: {
            data: Buffer,
            contentType: String
        },
        tipo_consulta: {
            type: String,
            enum: ['clinico_geral', 'pediatra', 'cardiologista', 'neurologista'],
            required: [true, "Informe um tipo de consulta"]
        },
        data_hora: {
            type: Date,
            required: [true, "Informe a data e hora da consulta"]
        }
    },
    {
        timestamps: true
    }
)


const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;
