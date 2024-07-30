const router = require('express').Router();
const todoCtrl = require('../controller/todos.controller');

router.post('/add-todo', todoCtrl.addTodo);
router.put('/update-todo/:id', todoCtrl.updateTodo);
router.delete('/delete-todo/:id', todoCtrl.deleteTodo);
router.get('/', todoCtrl.getAllTodos);


module.exports = router