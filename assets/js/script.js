$(document).ready(function () {
    // Navbar Toggle Button
    $('.toggle').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('toggle')) return;
        $('.toggle').toggleClass('active');
        $('.nav-menu').toggleClass('show');
    });
    $('.house-side-control').click(function (e) {
        e.preventDefault();
        if(!$(e.target).hasClass('btn')) return;
        var targetSide = $(e.target).attr('data-side');
        $('.house-model-container').addClass('active')
        // Nav btn control
        $('.house-side-control').addClass('active');
        $('.house-side-control > .list').children().removeClass('active');
        $(e.target).addClass('active');
        // Model container
        $('.house-model-container').addClass('active');
        $('.house-model-side').each(function () {
            $(this).removeClass('active');
            if($(this).attr('data-model') == targetSide) {
                $(this).addClass('active');
            }
        })
        // Controler function
        updateNav();
        modelHeightUpdate();
        updateAngle()
    })
    $('.house-nav').click(function (e) {
        e.preventDefault();
        if(!$(e.target).hasClass('nav-btn')) return;
        if($(e.target).hasClass('prev-side')) {
            $('.house-side-control .btn.active').removeClass('active').prev().addClass('active').click();
        }
        if($(e.target).hasClass('next-side')) {
            $('.house-side-control .btn.active').removeClass('active').next().addClass('active').click();
        }
    })

    function updateNav() {
        $('.house-side-control .list').children().each(function() {
            if(!$(this).hasClass('active')) return;
            if($(this).attr('data-side') == 'font-side') {
                $('.house-nav .nav-btn').removeClass('disable')
                $('.prev-side').addClass('disable');
            } else if($(this).attr('data-side') == 'left-side') {
                $('.house-nav .nav-btn').removeClass('disable')
                $('.next-side').addClass('disable');
            } else {
                $('.house-nav .nav-btn').removeClass('disable')
            }
        })
    }
    
    function modelHeightUpdate() {
        var modelHeight = [];
        $('.model-block').each(function() {
            modelHeight.push($(this).height())
        })
        var height = Math.floor(Math.min(...modelHeight))
        $('.model-block').css('height', height);
        $('.house-model-block').css('height', height + 80)
        $('.house-model-block').addClass('model3d');
        update3D();
    }

    function updateAngle() {
        $('.house-model-side').each(function (i, side) {
            if($(side).hasClass('active')) {
                $('.model3d').css('--deg', '-' + i * 90 + 'deg')
            }
        })
    }

    function update3D() {
        var modelWidth = [];
        $('.model-block').each(function() {
            modelWidth.push($(this).width())
        })
        var minWidth = Math.min(...modelWidth);
        var maxWidth = Math.max(...modelWidth);
        $('.house-model-side').css('--min', minWidth + 'px');
        $('.house-model-side').css('--max', maxWidth + 'px');
    }
});
