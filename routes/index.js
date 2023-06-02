const userRouter = require("./userRoute");
const todoRouter = require("./todoRoute")

const router = require("express").Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(userRouter);
router.use(todoRouter);

module.exports = router;
