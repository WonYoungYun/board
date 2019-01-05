const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");

const indexRouter = require('./js/routes/index')
const pageRouter = require('./js/routes/page')




const PORT = 8000;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

app.get('*', (req, res, next) => {
    fs.readdir('./data', (err, filelist) => {
        req.list = filelist
        next()
    })
})

app.use('/', indexRouter)
app.use('/page', pageRouter)



app.use((req, res, next) => {
    res.status(404).send("Sorry No page");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("error500");
});

app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});