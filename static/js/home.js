$(document).ready(function(){

    var navbarFixed = false;
    $(document).scroll(function() {
        var scrollPos = $(this).scrollTop();
        if(scrollPos > 600) {
            if (!navbarFixed){
                $('header').addClass('navbar-scrolled');
                $('#home').css('margin-top', '0');
                navbarFixed = true;
            }
        } else {
            if (navbarFixed){
                navbarFixed = false;
                $('header').fadeOut(function(){
                    $('header').removeClass('navbar-scrolled');
                    $('header').show();
                    $('#home').css('margin-top', '-56px');
                });
            }
        }
    });

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

    // $('.member section').hide();
    //
    // $('.member').hover(
    //     function () {
    //         $(this).find('section').fadeIn();
    //     },
    //     function () {
    //         $(this).find('section').fadeOut();
    //     }
    // );

    // Close menu when a nav item is selected
    $('#menu ul a').click(function() {
        $('#menu ul.open').removeClass('open');
    });
});

function toggleMenu() {
    $('#menu ul').toggleClass('open');
}
