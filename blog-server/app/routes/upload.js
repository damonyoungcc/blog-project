const Router = require('koa-router');
const router = new Router();
const { upload } = require('../controllers/upload');

router.post('/api/upload', upload);

module.exports = router;
