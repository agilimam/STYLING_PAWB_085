const express = require("express");
const router = express.Router();
const controllertodo = require("../controller/controller-todo");

router.get('/', controllertodo.getTodoList);
router.get('/add', controllertodo.formTodo);
router.post('/save', controllertodo.saveTodo);
router.get('/edit/:id', controllertodo.editTodo);
router.post('/update/:id', controllertodo.updateTodo);
router.get('/delete/:id', controllertodo.deleteTodo);

module.exports = router;