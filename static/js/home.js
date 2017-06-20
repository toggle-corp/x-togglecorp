$(document).ready(function() {
    $('.carousel').each(() => {
        new TerminalCarousel($(this), 64, 8, 3000, 200);
    });
});
