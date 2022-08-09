$(document).ready(function () {
    // All Function
    function updateImage (modelSize) {
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
        $('.model-bg').on('load',function() {
            getModelReady();
        })
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
        console.log(modelHeight)

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
        $('.house-model-block').css('--maxWidth', modelMaxWidth + 'px');
        $('.house-model-block').css('--minWidth', modelMinWidth + 'px');
    }


    $('.toggle').click(function (e) { 
        e.preventDefault();
        $('.toggle').toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // House Size Control
    $('[data-control="house-size"]').click(function (e) {
        if(!$(e.target).hasClass('nav-item')) return;
        $('[data-control="house-size"]').animate({
            paddingTop: 0,
            paddingBottom: 0,
            height: "toggle"
        }, 500);
        // Reset Model Height
        $('.model-side').css('height', 'unset');
        // getModelReady()

        // Model Size Update
        var modelSize = $(e.target).text().trim();
        updateImage (modelSize)



        $('.house-model-section').css('max-height', '1000px');
    })
});