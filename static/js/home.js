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
});
