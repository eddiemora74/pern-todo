const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const sqlStatements = {
  selectAll: () => {
    return `
    SELECT * FROM todos
    ORDER BY "Priority" DESC, id ASC
    `;
  },
  selectOne: () => {
    return `
    SELECT * FROM todos 
    WHERE id = $1
    `;
  },
  createTodo: () => {
    return `
    INSERT INTO todos ("Todo", "Status", "Priority") 
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  },
  updateTodo: () => {
    return `
    UPDATE todos
    SET "Todo" = $2,
        "Status" = $3,
        "Priority" = $4
    WHERE id = $1
    `;
  },
  deleteTodo: () => {
    return `
    DELETE FROM todos
    WHERE id = $1
    `;
  },
  deleteManyByColumn: (column) => {
    return `
    DELETE FROM todos
    WHERE "${column}" = $1
    `;
  },
};

const todoSql = {
  selectAll: async () => {
    const response = await pool.query(sqlStatements.selectAll());
    return response.rows;
  },
  selectOne: async (id) => {
    const response = await pool.query(sqlStatements.selectOne(), [id]);
    return response.rows[0];
  },
  createTodo: async (payload) => {
    const { Todo, Status, Priority } = payload;
    const response = await pool.query(sqlStatements.createTodo(), [
      Todo,
      Status,
      Priority,
    ]);
    return response.rows[0];
  },
  updateTodo: async (id, payload) => {
    const { Todo, Status, Priority } = payload;
    await pool.query(sqlStatements.updateTodo(), [id, Todo, Status, Priority]);
    return "Updated successfully!";
  },
  deleteTodo: async (id) => {
    await pool.query(sqlStatements.deleteTodo(), [id]);
    return "Todo deleted!";
  },
  deleteManyByColumn: async (column, value) => {
    await pool.query(sqlStatements.deleteManyByColumn(column), [value]);
    return "Todos deleted!";
  },
};

module.exports = todoSql;
