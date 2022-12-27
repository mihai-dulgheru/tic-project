const { Router } = require('express');
const { Todo } = require('../controllers');
const { todoSchema } = require('../schemas');
const { validate } = require('../../middleware');

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.post('/admin/todos', validate(todoSchema), Todo.create);
router.get('/admin/todos', Todo.readMany);
router.get('/admin/todos/:id', Todo.readOne);
router.put('/admin/todos/:id', Todo.update);
router.delete('/admin/todos/:id', Todo.remove);

router.post('/admin/todos/:id/check', Todo.check);
router.post('/admin/todos/:id/uncheck', Todo.uncheck);

module.exports = router;
