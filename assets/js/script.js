$( document ).ready(function() {
    const updateBaseHeight = function() {
        var baseHeight = [];
        $('.house-model-block').children().each(function() {
            var height = $(this).find('.model-block').height();
            baseHeight.push(height);
        })
        var height = Math.floor(Math.ceil(Math.min(...baseHeight)) / 10) * 10;

        // $('.house-model-side .model-block').css('height', Math.ceil(Math.min(...baseHeight)) + 'px');

        $('.house-model-container').css('--height', height + 'px');
        // console.log(baseHeight, Math.ceil(Math.min(...baseHeight)))
    }
    
    const updateBaseWidth = function() {
        var baseWidth = [];
        $('.house-model-block').children().each(function() {
            var width = $(this).find('.model-block').width();
            baseWidth.push(width);
        })
        $('.house-model-container').css('--x-width', Math.floor(Math.min(...baseWidth)) + 'px');
        $('.house-model-container').css('--z-width', Math.ceil(Math.max(...baseWidth)) + 'px');
    }
    
    setInterval(() => { 
        updateBaseHeight();
        updateBaseWidth();
    }, 5000);


    const updateNav = function () {
        var view = Number($('.house-model-block').css("--view-deg").replace('deg', ''));
        if(view == 0 || view == -0) {
            $('.house-nav').children().each(function () {
                $(this).removeClass('disable');
                $('.prev-side').addClass('disable');
            })
        } else if(view == -270) {
            $('.house-nav').children().each(function () {
                $(this).removeClass('disable');
                $('.next-side').addClass('disable');
            })
        } else {
            $('.house-nav').children().each(function () {
                $(this).removeClass('disable')
            })
        }
    }

    const updatePrice = function() {
        var SCREW_BASE = Number($('.screw-base-price').text());
        var CONCRETE_BASE = Number($('.concrete-base-price').text());

        var PARTS = $('.house-model-side.active .house-model-place').children();
        if(!$(PARTS).length) {
            var SCREW_BASE = 0;
            var CONCRETE_BASE = 0;
        }

        var totalPrice = 0;
        PARTS.each(function(){
            var price = Number($(this.children[0]).attr('data-price'));
            totalPrice += price;
        })
        
        var screwPriceHtml = (SCREW_BASE + totalPrice).toFixed(2) + ' Kr';
        var concretePriceHtml = (CONCRETE_BASE + totalPrice).toFixed(2) + ' Kr';

        $('.house-model-side.active .screw-price span').html(screwPriceHtml);
        $('.house-model-side.active .concrete-price span').html(concretePriceHtml);
    }

    $('.house-side-control > ul').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('btn')) return;
        var SIDE = $(e.target).attr('data-side'); 
        $('.house-model-block > *').each(function (i, side) {
            $(side).removeClass('active');
            if($(side).attr('data-model') == SIDE) {
                $(side).addClass('active');
                var view = '-' + (i * 90) + 'deg';
                $('.house-model-block').css("--view-deg", view);
            }
        });
        updateNav();
    });

    
    $('.house-nav').click(function (e) {
        var view = Number($('.house-model-block').css("--view-deg").replace('deg', ''));
        if($(e.target).hasClass('prev-side')) {
            view = (view + 90) + 'deg';
            $('.house-model-block').css("--view-deg", view);
            $('.house-model-side.active').removeClass('active').prev().addClass('active');
            updateNav();
        } else if($(e.target).hasClass('next-side')) {
            view = (view - 90) + 'deg';
            $('.house-model-block').css("--view-deg", view);
            $('.house-model-side.active').removeClass('active').next().addClass('active');
            updateNav();
        }
    })

    $('.house-element-block').click(function (e) {
        if($(e.target).hasClass('model-part-block')) {
            var BASE_WIDTH = $('.house-model-side.active .house-model-place').width();
            console.log(BASE_WIDTH)

            var modelPart = $(e.target).clone();
            $('.house-model-side.active .house-model-place').append(modelPart);

            var PARTS = $('.house-model-side.active .house-model-place').children();
            var PARTS_WIDTH = 0;
            PARTS.each(function () {
                PARTS_WIDTH += $(this).width();
            })
            if(PARTS_WIDTH > BASE_WIDTH) {
                $('.house-model-side.active .house-model-place').children().last().remove();
                alert("You can't able to add more parts")
            }

            updatePrice();
        }
    })

    $('.house-control-nav').click(function (e) {
        e.preventDefault();
        if($(e.target).hasClass('btn')) {
            // Reset All
            if($(e.target).attr('data-control') == 'reset-all') {
                $('.house-model-place').html('');
                $('.model-price-block').find('.screw-price span').html('0.00 Kr');
                $('.model-price-block').find('.concrete-price span').html('0.00 Kr');
            }

            // Reset Side
            if($(e.target).attr('data-control') == 'reset-side') {
                $('.house-model-side.active .house-model-place').html('');
                updatePrice();
            }

            // Save PDF
            if($(e.target).attr('data-control') == 'save-pdf') {
                console.log('Save AS PDF')
            }
        }
    })
    
});

