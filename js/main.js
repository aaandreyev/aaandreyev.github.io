$(document).ready(function () {
    var loading = $('.loading');
    loading.animate({
        opacity: 0
    }, 250, 'swing', function () {
        $(this).css('display', 'none');
        $('body').css('overflow-y', 'scroll');
    });


    var allWorks = $('.work');
    var worksTotal = allWorks.length;
    var displayed = 0;
    var displayFrom = 0;
    var works = $('.works .row');
    $('.works .row').empty();

    $('.works__viewMore small').on('click', function () {
        addWork();
        lightbox();
    });
    function addWork() {
        for (var k = displayFrom; k < displayFrom + 8 && k < worksTotal; k++) {
            works.append(allWorks[k]);
            $(allWorks[k]).css({
                opacity: '0'
            }).animate({
                opacity: 1
            }, 200);
            displayed += 1;
        }
        displayFrom = displayed;
        console.log(displayed, worksTotal);
        if (displayed == worksTotal) {
            $('.works__viewMore small').html('COME BACK SOON FOR NEW PORTION OF AWESOMENESS, BRO');
        }
    }

    addWork();
    lightbox();
    $('[data-toggle="tooltip"]').tooltip();
    var overlay = false;
    var modal = $('.modal-window');
    var overlayWindow = $('.overlay');
    var overlayBgContent = $('.overlay__bg .content');
    var header = $('.header');

    function lightbox() {
        $('.works__item').on('click', function (evt) {
            evt.stopPropagation();
            if (!overlay) {
                $('html body').css('overflow', 'hidden');
                header.hide(200);
                $(this).find('.works__item-big').clone().css('display', 'block').prependTo(modal);
                overlayWindow.css('display', 'block').stop().animate({
                    opacity: '1',
                    scrollTop: '0'
                }, 0);
                $('.overlay__bg').css('height', modal.height());
                overlayBgContent.stop().animate({
                    width: modal.height() * 3,
                    height: modal.height() * 3,
                    opacity: '1',
                    borderRadius: 0
                }, 400, 'swing', function () {
                    modal.stop().animate({
                        opacity: '1',
                        top: -modal.height() * .1
                    }, 150, 'swing');
                });
                var pullDown = $(this).parent().height()- $(this).height() > 80 ? $(this).parent().height()- $(this).height() : 100;
                $('.pull-down').each(function() {
                    $(this).css('margin-top',pullDown);
                });

                overlay = true;
            }
        });
        $('.overlay__close').on('click', function (evt) {
            console.log('click');
            evt.stopPropagation();
            if (overlay) {
                header.show(200);
                overlayBgContent.stop().animate({
                    width: '0',
                    height: '0',
                    opacity: '0'
                }, 500, 'swing', function () {
                    modal.stop().animate({
                        opacity: '0',
                        top: modal.height() * .1
                    }, 200, function () {
                        $(this).empty();
                    });
                });
                overlayWindow.stop().animate({
                    opacity: '0'
                }, 300, function () {
                    $(this).css('display', 'none');
                    $('html body').css({
                        overflowX: 'hidden',
                        overflowY: 'auto'
                    });
                });

                overlay = false;
            }
        });
    }

    $(function () {
        $('.header .menu p').on('click', function (event) {
            var $anchor = $(this);

            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 500, 'swing', function () {
                console.log('scrolled', $($anchor.attr('href')).offset().top);
            });
            event.preventDefault();
        })
    });
});
