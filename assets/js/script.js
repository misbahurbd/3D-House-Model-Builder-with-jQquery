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

    // Model setup function
    function getModelReady() {
        // Model Height
        var modelHeight = []
        $('.model-bg').each(function() {
            modelHeight.push($(this).height());
        })
        var minHeight = Math.min(...modelHeight)
        var height = Math.trunc(minHeight / 10) * 10;
        $('.model-side').css('height', height + 'px');

        var modelWidth = []
        $('.model-side').each(function() {
            modelWidth.push($(this).width());
        })
        var modelMaxWidth = Math.max(...modelWidth);

        var sideHeight = $('.house-model-side').outerHeight() + (modelMaxWidth / 12);
        $('.house-model-block').addClass('active').css('height', sideHeight);
        // Update Model Size
        update3DModel();

        var sectionHeight = $('.house-model-section .wrapper').outerHeight();
        $('.house-model-section').css('max-height', sectionHeight);
    }

    // Active 3D Function
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
        $('.house-parts-section').delay(300).slideDown(500);       
    }

    // 3D Rotate control
    function updateRotate() {
        $('[data-control="house-side"] .nav-item').each(function(i, side) {
            if($(this).hasClass('active')){
                var position = '-' + (i * 90) + 'deg';
                $('.house-model-block').css('--deg', position);
            }
        })
    }

    // Price update function
    function updatePrice () {
        // Individual Side Cost 
        var currentSideParts = $('.house-model-side.active').find('.model-part');
        var currentSidePrice = $('.house-model-side.active').find('.model-price span')
        var currentSideCost = 0;
        $(currentSideParts).each(function () {
            currentSideCost += parseFloat($(this).attr('data-price'))
        });
        $(currentSidePrice).text(currentSideCost.toFixed(2));

        // Total Side Cost with Funcation Costing
        var totalSideParts = $('.house-model-block').find('.model-part');
        var totalScrewPrice = $('.total-cost .screw-price').find('span');
        var totalConcretePrice = $('.total-cost .concrete-price').find('span');

        // Base Price
        var screwBasePrice = 0;
        var concreteBasePrice = 0;
        if(totalSideParts.length) {
            screwBasePrice = 1200;
            concreteBasePrice = 1500;
        }

        var totalCost = 0;
        $(totalSideParts).each(function () {
            totalCost += parseFloat($(this).attr('data-price'));
        });
        $(totalScrewPrice).text((totalCost + screwBasePrice).toFixed(2));
        $(totalConcretePrice).text((totalCost + concreteBasePrice).toFixed(2));
    }

    // Reset all elements
    function resetAll () {
        var totalSideParts = $('.house-model-block').find('.model-set-placeholder');
        $(totalSideParts).each(function () {
            // element == this
            $(this).children().remove();
            $('.model-price span').text('0.00');
            updatePrice();
        });
    }
    function reset() {
        $('.house-model-side.active').find('.model-set-placeholder').children().remove();
        updatePrice();
        
    }
    function savepsdf() {
        console.log('Save as PDF')
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
        
        $('[data-side="font"]').click();

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

    // Side Navigation Button
    $('[data-control="side-nav"]').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('btn')) return;
        var activeSide = $('[data-control="house-side"] .nav-item.active');
        var sides = $('[data-control="house-side"] .nav-item')
        if($(e.target).attr('data-name') == 'prev') {
            if(sides.first().hasClass('active')) {
                sides.last().click();
            } else {
                activeSide.prev().click();
            }
        } else if($(e.target).attr('data-name') == 'next') {
            if(sides.last().hasClass('active')) {
                sides.first().click();
            } else {
                activeSide.next().click();
            }
        }
    });

    // House Parts Control
    $('.house-parts-block').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('model-part-block')) return;
        var activeSide = $('.house-model-side.active')
        var modelPlaceholder = $('.house-model-side.active .model-set-placeholder')
        var houseParts = $(e.target).clone();
        modelPlaceholder.append(houseParts);

        var elementWidth = 0;
        $(modelPlaceholder.children()).each(function (index, element) {
            elementWidth += $(this).width();
        })
        if(elementWidth > $(activeSide).width()) {
            modelPlaceholder.children().last().remove();
            alert('No space for add more parts')
        }
        houseParts.animate({
            opacity: 1
        }, 100)
        updatePrice();
    });

    $('[data-control="house-cta"]').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('nav-item')) return;
        switch ($(e.target).attr('data-name')) {
            case 'resetall':
                resetAll();
                break;
            case 'reset':
                reset();
                break;
            case 'savepdf':
                savepsdf();
                break;
            default:
                break;
        }
    });
});