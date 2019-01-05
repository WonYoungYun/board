const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sanitizeHtml = require('sanitize-html')
const template = require('../lib/template.js')




router.get("/create", (req, res) => {
  fs.readdir('data', (err, filelist) => {
    let title = "글쓰기";
    // let list = template.list(filelist);
    let html = template.HTML(
      title,
      '',
      `
      <div class="create_page">
        <div class="write_logo">
            <h2>글쓰기</h2>
        </div>
        <form action="/page/create" method="post">
          <div class="page_title">
            <input type="text" name="title" placeholder="제목" autocomplete="off">
          </div>
          <div class="page_description">
            <textarea name="description" placeholder="내용"></textarea>
          </div>
          <div class="btn_tab">
            <button  type="button" class="cancel_btn">취소</button>
            <button type="submit" class="submit_btn"> 등록</button>
          </div>
        </form>
        <script src="/js/create.js"></script>
    </div>
        `,
      ''
    );
    res.send(html);
  });
});

router.post("/create", (req, res) => {
  let post = req.body;
  let title = post.title;
  let description = post.description;
  fs.writeFile(`data/${title}`, description, "utf8", err => {
    res.redirect(`/page/${title}`);
  });
});

router.get("/update/:page_id", (req, res) => {
  fs.readdir("data", (err, filelist) => {
    let filteredId = path.parse(req.params.page_id).base;
    fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
      let title = req.params.page_id;
      let list = template.list(filelist);
      let html = template.HTML(
        title,
        list,
        `
        <div class="create_page">
        <div class="write_logo">
            <h2>글쓰기</h2>
        </div>
        <form action="/page/create" method="post">
          <div class="page_title">
          <input type="hidden" name="id" value="${title}">
            <input type="text" name="title" placeholder="제목" value="${title}" autocomplete="off ">
          </div>
          <div class="page_description">
            <textarea name="description" placeholder="내용">${description}</textarea>
          </div>
          <div class="btn_tab">
            <button  type="button" class="cancel_btn">취소</button>
            <button type="submit" class="submit_btn"> 등록</button>
          </div>
        </form>
        <script src="/js/create.js"></script>
    </div>
            `,
        ``
      );
      res.send(html);
    });
  });
});

router.post("/update", (req, res) => {
  let post = req.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, error => {
    fs.writeFile(`data/${title}`, description, "utf8", err => {
      res.writeHead(302, {
        Location: `/?id=${title}`
      });
      res.end();
    });
  });
});

router.post("/delete", (req, res) => {
  let post = req.body;
  let id = post.id;
  let filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, err => {
    res.redirect("/");
  });
});

router.get("/:page_id", (req, res, next) => {
  fs.readdir("data", (err, filelist) => {
    let filteredId = path.parse(req.params.page_id).base;
    fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
      if (err) {
        next(err);
      } else {
        let title = req.params.page_id;
        let sanitizedTitle = sanitizeHtml(title);
        let sanitizedDescription = sanitizeHtml(description, {
          aloowedTags: ["h1"]
        });
        let list = template.list(filelist);
        let html = template.HTML(
          sanitizedTitle,
          list,
          `
          <div class="page">
            <h2>${sanitizedTitle}</h2>
            <div class="description">
              <span>${sanitizedDescription}</span>
            </div>
          </div>
          `,
          `
            <div class="page_tag">
            <form action="/page/delete" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" class="del_btn" value="삭제">
            </form>
            <div class="update_btn">
              <a href="/page/update/${sanitizedTitle}">수정</a>
            </div>
            <div class="crt_btn"> 
              <a href="/page/create">글쓰기</a>
            </div>
            </div>
            `
        );
        res.send(html);
      }
    });
  });
});

module.exports = router