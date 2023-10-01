const router = require('express').Router();
const sequelize = require('../util/db');

router.get('/', async (_, res) => {
  const sql = `
    SELECT Users.name AS name, COUNT(Blogs.id) as articles, SUM(Blogs.likes) AS likes FROM Blogs
    INNER JOIN Users ON Blogs.author = Users.id
    GROUP BY Users.id
    ORDER BY likes DESC
  `;
  const [result] = await sequelize.query(sql);
  res.json(result);
});

module.exports = router;
