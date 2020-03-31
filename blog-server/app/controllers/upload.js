const path = require('path');
class UploadCtl {
  upload(ctx) {
    const file = ctx.request.files.avatar;
    const basename = path.basename(file.path);
    ctx.body = { url: `/upload/${basename}` };
  }
}

module.exports = new UploadCtl();
