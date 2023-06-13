const mongoose = require('mongoose')

const consultaSchema = mongoose.Schema(
    {
        data: {
            type: String,
            required: [true, "Informe uma data"]
        },
        paciente: {
            type: String,
            required: [true, "Informe um paciente"]
        },
        medico: {
            type: String,
            required: [true, "Informe um medico"]
        },
        tipo_consulta: {
            type: String,
            enum: ['clinico_geral', 'pediatra', 'cardiologista', 'neurologista'],            
        },
    },
    {
        timestamps: true
    }
)


const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;
