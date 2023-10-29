const { User, Blog, ReadingList } = require('../models');
const router = require('express').Router();
const userTokenExtrator = require('../middleware/userTokenExtractor');

router.get('/', async (_, res) => {
  const users = await User.findAll({ include: { model: Blog } });
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { read } = req.query;

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: ReadingList,
      attributes: ['isRead', 'id'],
      include: {
        model: Blog,
        include: User,
      },
    },
  });

  const transformed = { name: user.name, username: user.username };

  transformed.readings = user.readings.map((r) => {
    const author = r.blog.user;
    const { id, url, title, likes, year } = r.blog;
    return {
      id,
      url,
      title,
      likes,
      year,
      author: author.name,
      readinglists: { id: r.id, read: r.isRead },
    };
  });

  if (req.query.read === 'true' || req.query.read === 'false') {
    const booleanValue = req.query.read === 'true';
    transformed.readings = transformed.readings.filter(
      (r) => r.readinglists.read === booleanValue
    );
  }

  res.status(200).json(transformed);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

router.use(userTokenExtrator);

router.put('/:username', async (req, res) => {
  const targetUser = req.user;
  targetUser.username = req.body.username;
  targetUser.save();
  res.status(200).json(targetUser);
});

module.exports = router;
