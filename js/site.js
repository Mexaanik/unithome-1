/**
 * @param sliderSelector
 * @constructor
 */
var Slider = function (sliderSelector) {
    this.$slider = sliderSelector;
    this.$nextBtn = $('.js-nextBtn', this.$slider);
    this.$prevBtn = $('.js-prevBtn', this.$slider);
    this.$slideNavBtn = $('.js-navBtn', this.$slider);
    this.$slidewrapper = $('.js-slidewrapper', this.$slider);

    var _self = this;
    var slideNow = 1;
    var slideCount = this.$slidewrapper.children().length;
    var navBtnId = 0;
    var translateWidth = 0;

    this.eventsBuild = function () {
        this.$nextBtn.on('click', function () {
            _self._nextSlide();
        });

        this.$prevBtn.on('click', function () {
            _self._prevSlide();
        });

        this.$slideNavBtn.on('click', function () {
            navBtnId = $(this).index();

            if (navBtnId + 1 !== slideNow) {
                translateWidth = -_self.$slider.width() * (navBtnId);
                _self.$slidewrapper.css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });

                slideNow = navBtnId + 1;
            }
        });
    };

    this._nextSlide = function () {
        if (slideNow === slideCount || slideNow <= 0 || slideNow > slideCount) {
            _self.$slidewrapper.css('transform', 'translate(0, 0)');

            slideNow = 1;
        } else {
            translateWidth = -_self.$slider.width() * (slideNow);

            _self.$slidewrapper.css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });

            slideNow++;
        }
    };

    this._prevSlide = function () {
        if (slideNow === 1 || slideNow <= 0 || slideNow > slideCount) {
            translateWidth = -_self.$slider.width() * (slideCount - 1);

            _self.$slidewrapper.css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });

            slideNow = slideCount;
        } else {
            translateWidth = -_self.$slider.width() * (slideNow - 2);

            _self.$slidewrapper.css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });

            slideNow--;
        }
    };

    this.init = function () {
        this.eventsBuild();
    };
};


$(document).ready(function () {
    var Slider1 = new Slider($('.js-slider-one'));
    Slider1.init();

    var Slider2 = new Slider($('.js-slider-two'));
    Slider2.init();

    var Slider3 = new Slider($('.js-slider-three'));
    Slider3.init();

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        alwaysShowNavOnTouchDevices:true,
        albumLabel:"Изображение %1 из %2"
    });

    $('.nav-item-5').on('click', function() {
        $('html,body').animate({scrollTop:$('.block-5').offset().top+"px"},{duration:1E3});
    });

    $('.nav-item-1').on('click', function() {
        $('html,body').animate({scrollTop:$('.block-3').offset().top+"px"},{duration:1E3});
    });

    $('.nav-item-2').on('click', function() {
        $('html,body').animate({scrollTop:$('.block-4').offset().top+"px"},{duration:1E3});
    });

    $('.nav-item-3').on('click', function() {
        $('html,body').animate({scrollTop:$('.work-item').offset().top+"px"},{duration:1E3});
    });

    $('.nav-item-4').on('click', function() {
        $('html,body').animate({scrollTop:$('.bunch').offset().top+"px"},{duration:1E3});
    });

});


