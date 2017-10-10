$(document).ready(function(){
    fixCarousel();
    $( window ).resize(function(){
        fixCarousel();
    });

    $('.carousel').each(function() {
        new TerminalCarousel($(this), 64, 8, 3000, 200);
    });

    function fixCarousel(){
        if($('body').width() < 888){
            $('#product-list-wrapper').css('margin-left', (($('body').width()-888)/2)+'px');
            $('#previous').css('left', ((888 - $('body').width())/2)+'px')
            $('#next').css('right', ((888 - $('body').width())/2)+'px')
        } else{
            $('#product-list-wrapper').css('margin-left', 'auto');
        }
    }

    $(function() {
           $('a[href*="#"]:not([href="#"])').click(function() {
               if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                   var target = $(this.hash);
                   target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                   if (target.length) {
                       $('html, body').animate({
                           scrollTop: target.offset().top
                       }, 500);
                       return false;
                   }
               }
           });
    });
    buildProductsCarousel();
});

var productsCarousel = {};
var delayed = false;

function buildProductsCarousel() {
    productsCarousel.products = $('.product');
    productsCarousel.firstVisible = 0;

    productsCarousel.refresh = function() {
        var products = productsCarousel.products;
        var firstVisible = productsCarousel.firstVisible;

        var i = firstVisible;
        var n = 0;
        for (; i<products.length; i++) {
            if (n < 7) {
                products.eq(i).attr('class', 'product product-'+(n+1));
            } else {
                products.eq(i).attr('class', 'product product-0');
            }

            n++;
        }
        i = 0;
        for (; i<firstVisible; i++) {
            if (n < 7) {
                products.eq(i).attr('class', 'product product-'+(n+1));
            } else {
                products.eq(i).attr('class', 'product product-0');
            }

            n++;
        }
    }

    productsCarousel.next = function() {
        productsCarousel.firstVisible++;
        if (productsCarousel.firstVisible >= productsCarousel.products.length) {
            productsCarousel.firstVisible = 0;
        }
        productsCarousel.refresh();
    }

    productsCarousel.previous = function() {
        productsCarousel.firstVisible--;
        if (productsCarousel.firstVisible < 0) {
            productsCarousel.firstVisible = productsCarousel.products.length-1;
        }
        productsCarousel.refresh();
    }

    productsCarousel.products.on('click', function() {
        productsCarousel.firstVisible = $(this).index() - 3;
        if (productsCarousel.firstVisible < 0) {
            productsCarousel.firstVisible = productsCarousel.products.length + productsCarousel.firstVisible;
        }
        productsCarousel.refresh();
        delayed = true;
    });

    setInterval(function(){
        if(delayed){
            delayed = false;
        } else{
            productsCarousel.next()
        }
    }, 2500);
}
