const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')


// router.get("/page", (req, res) => {
//     res.redirect("/")
// })


router.get("/", (req, res) => {
    let title = "메인 페이지";
    let list = template.list(req.list);
    let html = template.HTML(title, list, ``,
        `
            <h2>게시판</h2>
            <div class="create_btn">
                <a href="/page/create">글쓰기</a>
            </div>
        `);
    res.send(html);
});

module.exports = router