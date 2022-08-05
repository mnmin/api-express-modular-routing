const express = require('express')
const { films } = require('../../data')

const filmRouter = express.Router()

filmRouter.get('/', (req, res) => {
    res.json({
        films: films
    })
})

filmRouter.post('/', (req, res) => {
    const createdFilm = {
        ...req.body,
        id: films.length + 1,
        title: "string",
        director: "string"
    }

    films.push(createdFilm)

    res.status(201).json({
        film: {
            ...createdFilm,
        }
    })
})

filmRouter.get('/:id', (req, res) => {
    const foundFilm = films.find(film => film.id === Number(req.params.id))

    if (!foundFilm) {
        
        return res.status(404).json({
            error: "The film with the provided ID does not exist"
        })
    }

    res.json({
        film: foundFilm
    })
})

filmRouter.delete('/:id', (req, res) => {
    const foundFilm = films.find(f => f.id === Number(req.params.id))
    const index = films.indexOf(foundFilm)

    films.splice(index, 1)

    if (!foundFilm) {
        return res.status(404).json({
            error: `A film with the provided ID does not exist`
        })
    }

    res.status(200).json({
        film: {
            ...foundFilm,
        }
    })
})

filmRouter.put('/:id', (req, res) => {
    const oldFilm = films.find(film => film.id === Number(req.params.id))
    const index = films.indexOf(oldFilm)

    films.splice(index, 1, {...req.body, id: oldFilm.id})

    const updatedFilm = films.find(film => film.id === Number(req.params.id))

    res.status(201).json({
        film: {
            ...updatedFilm,            
        }
    })
})


module.exports = filmRouter