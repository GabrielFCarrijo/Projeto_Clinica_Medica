const Consulta = require('../models/consulta')
const controller = {}

controller.create = async (req, res) => {
    try {
        const consulta = await Consulta.create(req.body);
        res.status(200).json(consulta);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        const consulta = await Consulta.find({})
        res.status(200).json(consulta)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
  
controller.retrieveOne = async(req, res) => {
    try {
        const {id} = req.params
        const consulta = await Consulta.findById(id)
        res.status(200).json(consulta)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

controller.update = async (req, res) => {
    try {
        const {id} = req.params
        const consulta = await Consulta.findByIdAndUpdate(id, req.body)

        // se não encontrou um id correspondente
        if(!consulta){
            return res.status(404).json({message: `Consulta não encontrado`})
        }

        // se encontrou
        const consultaAtualizado = await Consulta.findById(id)
        res.status(200).json(consultaAtualizado)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

controller.delete = async (req, res) => {
    try {
        const {id} = req.params
        const consulta = await Consulta.findByIdAndDelete(id)

        // se não encontrou um id correspondente
        if(!consulta){
            return res.status(404).json({message: `Consulta não encontrado`})
        }
        
        // se encontrou
        res.status(200).json(consulta)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

controller.deleteAll = async (req, res) => {
    try {
        await Consulta.deleteMany({}) // Exclui todos os documentos da coleção "Consulta"

        res.status(200).json({ message: "Todos as consultas foram excluídas com sucesso" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = controller
