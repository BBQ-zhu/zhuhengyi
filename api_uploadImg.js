const Router = require('koa-router')
const KoaBody = require('koa-body')
const fs = require('fs')
const path = require('path')
const router = new Router()
// const koaBody = require('koa-body');
// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 400*1024*1024    // 设置上传文件大小最大限制，默认4M
//     }
// }));
const {controlCreateUploadImg,controlDelateUploadImg} = require('../control/task') //引入control校验

//上传图片
router.post('/uploadImg',KoaBody(), async (ctx) => {
    console.log(ctx.request.body)
    // console.log(ctx.request.)
      // 上传单个文件
  const fileUrl = ctx.request.files.file.path; // 获取上传文件
  const fileName = ctx.request.files.file.name; // 获取上传文件

  // 创建可读流
  const reader = fs.createReadStream(fileUrl);
  let filePath = path.join(__dirname, '../public/') + `/${fileName}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  ctx.body = {
    filename: ctx.request.files.file.name //返回文件名
}
    // let data = await controlCreateUploadImg()
    // ctx.body = {
    //     data
    // }
})
//删除图片
router.post('/delateImg',KoaBody(), async (ctx) => {
    //将前端传进来的参数送入conrol层校验
    let data = await controlDelateUploadImg()
    ctx.body = {
        data
    }
})


module.exports = router
