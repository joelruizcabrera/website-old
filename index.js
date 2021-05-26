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
    {url: "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"},
    {url: "/assets/js/main.js"},
    {url: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"}
]
web.locals.styles = [
    {url: "/assets/css/style.css"},
    {url: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"},
    {url: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"},
    {url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"}
]

web.locals.author = "Joel Ruiz Cabrera";
web.locals.email = "joel.schwegmann@gmx.de";
web.locals.pageDescription = "My name is Joel. I am a web developer and I am from Osnabrück, Germany.<br>Feel free to get inspired. ";

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
    {metaTag: '<meta name="description" content="' + web.locals.pageDescription +  '" />'},
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

web.locals.social = [
    {
        name: "Instagram",
        icon: "fab fa-instagram",
        username: "joelruizcabrera",
        link: "https://instagram.com/joelruizcabrera"
    },
    {
        name: "Twitter",
        icon: "fab fa-twitter",
        username: "joelruizcabrera",
        link: "https://twitter.com/joelruizcabrera"
    },
    {
        name: "LinkedIn",
        icon: "fab fa-linkedin-in",
        username: "Joel Schwegmann",
        link: "https://www.linkedin.com/in/joel-schwegmann-6a8709199/"
    },
    {
        name: "Spotify",
        icon: "fab fa-spotify",
        username: "Joel Ruiz Cabrera",
        link: "https://open.spotify.com/user/31jtlnadbppxegnafrhzjpczbpya?si=9b9d709b5baf4091"
    },
    {
        name: "Dribbble",
        icon: "fab fa-dribbble",
        username: "Joel Ruiz Cabrera",
        link: "https://dribbble.com/yurodev"
    },
    {
        name: "Discord",
        icon: "fab fa-discord",
        username: "Joel Ruiz Cabrera#1153",
        link: "https://discordapp.com/users/253605920888586241"
    }
]

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