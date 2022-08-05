$(document).ready(function () {
    $('.toggle').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('toggle')) return;
        $('.toggle').toggleClass('active');
        $('.nav-menu').toggleClass('show');

    });
});