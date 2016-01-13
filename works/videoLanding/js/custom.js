(function($) {
    $(document).ready(function() {

        if (!device.tablet() && !device.mobile()) {
            $(".player").mb_YTPlayer();
        } else {
            //jQuery will add the default background to the preferred class 
            $('.video-background').addClass(
                'video-background-default-image');
        }
    });
})(jQuery);