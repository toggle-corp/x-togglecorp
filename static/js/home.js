$(document).ready(function(){
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

    // $('.work-list').on('click', '.work', function(){
    //     var container = $(this).parent();
    //     var works = container.find('.work');
    //     var that = $(this);
    //     var temp = that.clone(true);
    //     (works.eq(0)).replaceWith(temp);
    //     that.replaceWith(works.eq(0));
    // });
    // $('.work-list').on('mouseover', '.work', function(){
    //     var container = $(this).parent();
    //     var works = container.find('.work');
    //     works.each(function(i){
    //         $(this).css('top', i*50+'px');
    //     });
    // });

    buildProductsCarousel();
});

var productsCarousel = {};
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
    });

    setInterval(productsCarousel.next, 2500);
}
