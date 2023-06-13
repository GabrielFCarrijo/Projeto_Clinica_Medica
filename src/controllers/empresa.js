const Empresa = require('../models/empresa')
const controller = {}

controller.create = async (req, res) => {
    try {
        const empresa = await Empresa.create(req.body);
        res.status(200).json(empresa);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        const empresa = await Empresa.find({})
        res.status(200).json(empresa)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
  
controller.update = async (req, res) => {
    try {
        const {id} = req.params
        const empresa = await Empresa.findByIdAndUpdate(id, req.body)

        // se não encontrou um id correspondente
        if(!empresa){
            return res.status(404).json({message: `Empresa não encontrado`})
        }

        // se encontrou
        const empresaAtualizada = await Empresa.findById(id)
        res.status(200).json(empresaAtualizada)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = controller
