const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const todosController = require('../controllers/todos') 

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/editTodo', todosController.editTodo);

router.all('/test', (req, res) => {
    res.send('Test route reached');
});

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router