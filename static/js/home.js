$(document).ready(function() {
    $('.carousel').each(() => {
        new TerminalCarousel($(this), 64, 8, 3000, 200);
    });

    $('.feature>div:first-child').on('click', function() {
        $('.feature.active').removeClass('active');
        $(this).closest('.feature').addClass('active');
    });
});
