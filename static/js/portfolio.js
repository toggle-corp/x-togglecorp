$(document).ready(function() {

    var index = 0;

    $('#next').click(function() {
        var contents = $('.content');
        var imgs = $('.preview img');

        if (index == contents.length - 1)
            return;

        contents.eq(index).addClass('prev');
        imgs.eq(index).addClass('prev');

        index++;

        contents.eq(index).removeClass('prev');
        contents.eq(index).removeClass('next');
        imgs.eq(index).removeClass('prev');
        imgs.eq(index).removeClass('next');
    });
    
    $('#prev').click(function() {
        if (index == 0)
            return;

        var contents = $('.content');
        var imgs = $('.preview img');

        contents.eq(index).addClass('next');
        imgs.eq(index).addClass('next');
        index--;

        contents.eq(index).removeClass('prev');
        contents.eq(index).removeClass('next');
        imgs.eq(index).removeClass('prev');
        imgs.eq(index).removeClass('next');
    });
});