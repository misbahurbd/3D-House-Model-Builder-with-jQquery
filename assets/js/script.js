$(document).ready(function () {
    // All Function
    function getModelReady(modelSize) {
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
        $('.model-bg[data-name="left-right"]').attr('src', modelSizeImg);
        
        setInterval(() => {
            // Model Height
            var modelHeight = []
            $('.model-side').each(function() {
                modelHeight.push($(this).height());
            })
            var minHeight = Math.min(...modelHeight)
            var height = Math.trunc(minHeight / 10) * 10;
            $('.model-side').css('height', height + 'px');

            // Update Model Sie
            update3DModel();
        }, 50);
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

        // Model Size Update
        var modelSize = $(e.target).text().trim();

        getModelReady(modelSize)
        $('.house-model-section').css('max-height', '1000px');
    })
});