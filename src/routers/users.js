const express = require('express')
const { users } = require('../../data')

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
    res.json({
        users: users
    })
})

usersRouter.post('/', (req, res) => {
    const createdUser = {
        ...req.body,
        id: users.length + 1,
        email: "mike@mail.com"
    }

    users.push(createdUser)

    // let mappedUsers = users.map(user => {
    //     return {
    //         ...users,
    //         email: email.filter(m => m.email === user.email)
    //     }
    // })

    if (typeof createdUser.email !== "string") {
        return res.status(400).json({
            error: "Missing fields in the request body"
        })
    }

    // if (mappedUsers.email === createdUser.email) {
    //     return res.status(409).json({
    //         error: "A user with the provided email already exists"
    //     })
    // }

    // if (mappedUser.email === users.email) {
    //     return res.status(409).json({
    //         error: "A user with the provided email already exists"
    //     })
    // }

    res.status(201).json({
        user: {
            ...createdUser,
        }
    })
})

usersRouter.get('/:id', (req, res) => {
    const foundUser = users.find(user => user.id === Number(req.params.id))

    if (!foundUser) {
        // return so the function stops executing after this line and doesn't try to send
        // another response
        return res.status(404).json({
            error: "The user with the provided ID does not exist"
        })
    }

    res.json({
        user: foundUser
    })
})

usersRouter.delete('/:id', (req, res) => {
    const foundUser = users.find(u => u.id === Number(req.params.id))
    const index = users.indexOf(foundUser)

    users.splice(index, 1)

    if (!foundUser) {
        return res.status(404).json({
            error: `A user with the provided ID does not exist`
        })
    }

    res.status(200).json({
        user: {
            ...foundUser,
        }
    })
})

module.exports = usersRouter