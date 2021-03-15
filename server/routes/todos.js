const router = require("express").Router();
const todoSql = require("../controllers/todos");

router.get("/", async (req, res) => {
  const response = await todoSql.selectAll();
  res.json(response);
});

router.post("/", async (req, res) => {
  const response = await todoSql.createTodo(req.body);
  res.json(response);
});

router.delete("/", async (req, res) => {
  const { column, value } = req.body;
  const response = await todoSql.deleteManyByColumn(column, value);
  res.json(response);
});

router.get("/:id", async (req, res) => {
  const response = await todoSql.selectOne(req.params.id);
  res.json(response);
});

router.put("/:id", async (req, res) => {
  const response = await todoSql.updateTodo(req.params.id, req.body);
  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const response = await todoSql.deleteTodo(req.params.id);
  res.json(response);
});

module.exports = router;
