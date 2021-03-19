const router = require("express").Router();
const todoSql = require("../controllers/todos");

function errorObject(Error, Message) {
  return { Error, Message };
}

router.get("/", async (req, res) => {
  try {
    const response = await todoSql.selectAll();
    res.json(response);
  } catch (err) {
    res.status(400).send(errorObject(err, "Error getting todos!"));
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await todoSql.createTodo(req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json(errorObject(err, "Error creating todo!"));
  }
});

router.delete("/", async (req, res) => {
  try {
    const { column, value } = req.body;
    const response = await todoSql.deleteManyByColumn(column, value);
    res.json(response);
  } catch (err) {
    res.status(400).json(errorObject(err, "Error deleting todo!"));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await todoSql.selectOne(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(400).json(errorObject(err, "Error getting todo!"));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await todoSql.updateTodo(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json(errorObject(err, "Error updating todo!"));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await todoSql.deleteTodo(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(400).json(errorObject(err, "Error deleting todo!"));
  }
});

module.exports = router;
