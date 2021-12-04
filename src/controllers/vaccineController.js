const Vaccine = require("../models/Vaccine")

const createVaccine = async (req, res) => {
    const { code, name, expected_date, vaccinated } = req.body
    try {
        const vaccine = await Vaccine.create({ code, name, expected_date, vaccinated });
        console.log(`Sua vacina ${vaccine.name} foi cadastrada.`);
        res.status(201).send(vaccine)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllVaccines = async (req, res) => {
    const name = req.query.name
    try{
        const where = name ? { where: { name } } : {}
        const vaccines = await Vaccine.findAll(where)
        if (vaccines && vaccines.length > 0) {
            res.status(200).send(vaccines)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).send ({ message: error.mesage })
    }     
}

const getVaccine = async (req, res) => {
    const vaccineId = req.params.id
    try {
        const vaccine = await Vaccine.findOne({
            where: { id: vaccineId }
        });
        if (vaccine) {
            res.status(200).send(vaccine)
        } else {
            res.status(404).send({ message: `Vacina com o id ${vaccineId} não encontrado na base.` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updateVaccinated = async (req, res) => {
    const vaccineId = req.params.id
    const vaccinated = req.body.vaccinated
    try {
        const updatedRows = await Vaccine.update({ vaccinated }, { where: { id: vaccineId } });
        if (updatedRows && updatedRows[0] > 0) {
            res.status(200).send({ message: `${updatedRows[0]} informação de vacina, com vacinação atualizada com sucesso` })    
       } else {
            res.status(404).send({ message: `Vacina com id ${vaccineId} não encontrada para atualizar a informação de vacinação` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const deleteVaccine = async (req, res) => {
    const vaccineId = req.params.id
    try {
        const rowDeleted = await Vaccine.destroy({ where: { id: vaccineId } });
        if (rowDeleted) {
            res.status(200).send({ message: `Vacinação(s) deletada(s) com sucesso` })
        } else {
            res.status(404).send({ message: `Vacina com id ${vaccineId} não encontrada para deletar` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}


module.exports = {
    createVaccine,
    getAllVaccines,
    getVaccine,
    updateVaccinated,
    deleteVaccine
}
