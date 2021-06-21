new WOW().init();

var scrollToTopBtn = document.querySelector(".scrollToTopBtn")
var rootElement = document.documentElement

function handleScroll() {
    // Do something on scroll
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if ((rootElement.scrollTop / scrollTotal ) > 0.30) {
        // Show button
        scrollToTopBtn.classList.add("showBtn")
    } else {
        // Hide button
        scrollToTopBtn.classList.remove("showBtn")
    }
}

function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
scrollToTopBtn.addEventListener("click", scrollToTop)
document.addEventListener("scroll", handleScroll)

var experience = {
    page : null,
    resize: null,
    init : function(){
// SET
        if($('#lines').length){
            this.setLines();
        }
    },
    setLines : function(){
        this.canvas = document.querySelector('canvas');

        var ctx = this.canvas.getContext('2d');

        var color;

        let colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        const setColorScheme = e => {
            if (e.matches) {
                color = '#fff';
            } else {
                color = '#000';
            }
        }
        setColorScheme(colorSchemeQueryList);


        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.display = 'block';
        ctx.fillStyle = color;
        ctx.lineWidth = .1;
        ctx.strokeStyle = color;

        this.resize = function(){
            experience.canvas.width = window.innerWidth;
            experience.canvas.height = window.innerHeight;
            ctx.fillStyle = color;
            ctx.lineWidth = .1;
            ctx.strokeStyle = color;
        };

        $(window).on('resize', experience.resize);

        var mousePosition = {
            x: 30 * experience.canvas.width / 100,
            y: 30 * experience.canvas.height / 100
        };

        var dots = {
            nb: window.innerWidth / 2,
            distance: 50,
            d_radius: 0.1 * window.innerWidth,
            array: []
        };

        function Dot(){
            this.x = Math.random() * experience.canvas.width;
            this.y = Math.random() * experience.canvas.height;
            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();
            this.radius = Math.random();

        }

        Dot.prototype = {
            create: function(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            }
        };

        Dot.animate = function(){
            var i, dot;

            for(i = 0; i < dots.nb; i++){
                dot = dots.array[i];

                if(dot.y < 0 || dot.y > experience.canvas.height){
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if(dot.x < 0 || dot.x > experience.canvas.width){
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        };

        Dot.line = function(){
            var i, j, i_dot, j_dot;

            for(i = 0; i < dots.nb; i++){
                for(j = 0; j < dots.nb; j++){
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        };

        function createDots(){
            var i;

            ctx.clearRect(0, 0, experience.canvas.width, experience.canvas.height);

            if(dots.array.length < 1) {
                for(i = 0; i < dots.nb; i++){
                    dots.array.push(new Dot());
                }
            }

            for(i = 0; i < dots.nb; i++){
                var dot = dots.array[i];
                dot.create();
            }

            Dot.line();
            Dot.animate();
        }

        $('#experience').on('mousemove mouseleave', function(e){
            if(e.type == 'mousemove'){
                mousePosition.x = e.pageX;
                mousePosition.y = e.pageY;
            }
            if(e.type == 'mouseleave'){
                mousePosition.x = experience.canvas.width / 2;
                mousePosition.y = experience.canvas.height / 2;
            }
        });

        this.interval = setInterval(createDots, 1000/30);

    },

    destroy : function() {
        if(this.interval) {
            clearInterval(this.interval);
        }
        if(experience.resize){
            $(window).on('resize', experience.resize);
        }

    }
};

experience.init();

$(document).ready(function() {
    var locationHref = window.location.href.split("/")
    console.log("Copyright \251 " + new Date().getFullYear() + " Joel Schwegmann. All Rights Reserved")
    console.log("Imprint: " + locationHref[0] + "//" + locationHref[2] + "/imprint")
    console.log("Privacy: " + locationHref[0] + "//" + locationHref[2] + "/privacy")
    console.log("%cYo, get out of my console! :D", "font-size: 30px;font-weight: 900")
    $(".slider-item-0").addClass("active")
    var scroll = $(window).scrollTop();
    checkNavPos(scroll);

    var currentPage = $("body").attr('class');

    $("body").animate({
        opacity: 1
    }, 1000)

    $('.navi-item').each(function(e) {
        if ($(this).hasClass(currentPage) === true) {
            $(this).addClass("active")
        }
    })

    var countingEls = [
        {"id": "shopwarePerc", "from": 0, "to": 50, "timeMil": 2500}
    ]

    countingEls.forEach((el) => {
        countingTo("#" + el.id, el.from, el.to, el.timeMil);
    });

    function countingTo(id, from, to, time) {
        $(id).text("0")
    }
console.log(_calculateAge('20040611'))
})

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    checkNavPos(scroll)
});

var height = $(".navigation").outerHeight();

function checkNavPos(scroll) {
    if ((scroll + height) >= $(".header").height()) {
        $('.navigation').css('padding', "1rem")
        $('.navigation li').css('margin-right', "2rem")
    } else {
        $('.navigation').css('padding', "3rem")
        $('.navigation li').css('margin-right', "3rem")
    }
}
