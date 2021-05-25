const express = require('express');
const web = express();
const hbs = require('express-handlebars');

const cfg = {
    "port": 3000
}

web.engine('handlebars', hbs())
web.set('view engine', 'handlebars')
web.use('/assets', express.static('views/public'))

web.locals.scripts = [
    {url: "https://code.jquery.com/jquery-3.6.0.min.js"},
    {url: "/assets/js/main.js"},
    {url: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"}
]
web.locals.styles = [
    {url: "/assets/css/style.css"},
    {url: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"}
]

web.locals.author = "John Doe";
web.locals.email = "joel.schwegmann@gmx.de";
var pageDescription = "asdasd";

var keywords = [
    "developer",
    "shopware",
    "osnabrück",
    "joelruizcabrera",
    "webdesigner",
    "frontend"
]


web.locals.meta = [
    {metaTag: '<meta http-equiv="content-Type" content="text/html; utf-8" />'},
    {metaTag: '<meta http-equiv="Pragma" content="cache" />'},
    {metaTag: '<meta name="robots" content="INDEX,FOLLOW" />'},
    {metaTag: '<meta name="robots" content="INDEX,FOLLOW" />'},
    {metaTag: '<meta http-equiv="content-Language" content="de" />'},
    {metaTag: '<meta http-equiv="content-Language" content="de" />'},
    {metaTag: '<meta name="description" content="' + pageDescription +  '" />'},
    {metaTag: '<meta name="author" content="' + web.locals.author + '" />'},
    {metaTag: '<meta name="publisher" content="' + web.locals.author + '" />'},
    {metaTag: '<meta name="copyright" content="' + web.locals.author + '" />'},
    {metaTag: '<meta name="audience" content="Alle" />'},
    {metaTag: '<meta http-equiv="Reply-to" content="' + web.locals.email + '" />'},
    {metaTag: '<meta name="expires" content="" />'},
]

web.locals.meta.push({metaTag: '<meta name="keywords" content="' + keywords + '" />'})

web.locals.pages = [
    {
        view: "home",
        route: "/",
        options: {
            pageName: "Home"
        }
    },
    {
        view: "about",
        route: "/about",
        options: {
            pageName: "About"
        }
    }
]

var workPages = require('./work.json');
web.locals.work = workPages.work;

for (let i = 0; i < workPages.work.length; i++) {
    web.get('/work/' + workPages.work[i].url, (req, res) => {
        res.render('work', workPages.work[i])
    })
}

for (let i = 0; i < web.locals.pages.length; i++) {
    web.get(web.locals.pages[i].route, (req, res) => {
        res.render(web.locals.pages[i].view, web.locals.pages[i].options)
    })
}

web.listen(cfg.port, () => {
    console.log(`Listening on port: ${cfg.port}`)
})