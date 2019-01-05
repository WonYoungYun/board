module.exports = {
    HTML: (title, list, body, control) => {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="/css/index.css">
            <link rel="stylesheet" href="/css/create.css">
            <link rel="stylesheet" href="/css/page.css">
            <title>${title}</title>
        </head>
        <body>
        <header class="header">
            <h1 class="logo"><a href="/">Community</a></h1>
        </header>
        <hr class="hide">
        <div id="wrap">
            <div class="content">
                ${body}
                <div class="bar">
                ${control}
            </div>
                <div class="page_list">
                    ${list}
                </div>

            </div>
        </div>
        <hr class="hide">
        <footer class="footer">
            <div class="copyright">
                <span>copyright(c)</span>
            </div>
            <div class="move_top">
                <a href="#">
                    <span>^</span>
                </a>
            </div>
        </footer>
        </body>
        </html>
      `;
    },
    list: (filelist) => {
        let list = '<ul class="page_list">';
        filelist.forEach(element => {
            list = list + `<li class="page_item"><a href="/page/${element}">${element}</a></li>`;
        });
        list = list + '</ul>';
        return list;
    }
}