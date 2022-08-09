$(document).ready(function () {
    // All Function
    function getReadyModel(modelSize) {
        // Update Model Image
        var modelSizeImg = '';
        switch (modelSize) { 
            case '60M': 
                modelSizeImg = './assets/img/wall_left_right_60m_house.jpg';
                break;
            case '70M': 
                modelSizeImg = './assets/img/wall_left_right_70m_house.jpg';
                break;
            case '80M': 
                modelSizeImg = './assets/img/wall_left_right_80m_house.jpg';
                break;
            case '90M': 
                modelSizeImg = './assets/img/wall_left_right_90m_house.jpg';
                break;
            case '100M': 
                modelSizeImg = './assets/img/wall_left_right_100m_house.jpg';
                break;
            default:
                break;
        }
        $($('.model-bg[data-name="left-right"]').attr('src', modelSizeImg));
        // Set element height
        $('.model-bg').on('load', getModelReady)
    }

    function getModelReady() {
        // Model Height
        var modelHeight = []
        $('.model-bg').each(function() {
            modelHeight.push($(this).height());
        })
        var minHeight = Math.min(...modelHeight)
        var height = Math.trunc(minHeight / 10) * 10;
        $('.model-side').css('height', height + 'px');

        var sideHeight = $('.house-model-side').outerHeight();
        $('.house-model-block').addClass('active').css('height', sideHeight);
        // Update Model Size
        update3DModel();
    }

    function update3DModel() {
        var modelWidth = []
        $('.model-side').each(function() {
            modelWidth.push($(this).width());
        })
        var modelMaxWidth = Math.max(...modelWidth);
        var modelMinWidth = Math.min(...modelWidth);
        $('.house-model-outer').css('--maxWidth', modelMaxWidth + 'px');
        $('.house-model-outer').css('--minWidth', modelMinWidth + 'px');
    
        $('.house-model-outer').addClass('model-3d');
    }

    function updateRotate() {
        $('[data-control="house-side"] .nav-item').each(function(i, side) {
            if($(this).hasClass('active')){
                var position = '-' + (i * 90) + 'deg';
                $('.house-model-block').css('--deg', position);
            }
        })
    }


    $('.toggle').click(function (e) { 
        e.preventDefault();
        $('.toggle').toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // House Size Control
    $('[data-control="house-size"]').click(function (e) {
        e.preventDefault();
        if(!$(e.target).hasClass('nav-item')) return;
        $('[data-control="house-size"]').animate({
            paddingTop: 0,
            paddingBottom: 0,
            height: "toggle"
        }, 500);

        // Reset Model Height
        $('.model-side').css('height', 'unset');

        // Model Size Update
        var modelSize = $(e.target).text().trim();
        getReadyModel(modelSize)

        $('.house-model-section').css('max-height', '1000px');
    })

    // House Side Control
    $('[data-control="house-side"]').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('nav-item')) return;
        
        $('[data-control="house-side"] .nav-item').removeClass('active')
        $(e.target).addClass('active');

        var side = $(e.target).attr('data-side');
        $('.house-model-side').each(function() {
            $(this).removeClass('active');
            if($(this).attr('data-name') == side) {
                $(this).addClass('active');
            }
        })
        updateRotate();
    });
});