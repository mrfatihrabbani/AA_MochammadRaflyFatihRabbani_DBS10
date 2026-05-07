const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoListController');

router.get('/', todoController.getAllTodoLists);
router.post('/', todoController.createTodoList);
router.delete('/:id', todoController.deleteTodoListById);
router.put('/:id', todoController.updateTodoListById);
router.get('/:id', todoController.getTodoListById);

module.exports = router;