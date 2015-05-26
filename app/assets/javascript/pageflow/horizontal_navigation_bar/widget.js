/*global IScroll*/

(function($) {
  $.widget('pageflow.horizontalNavigationBar', {
    _create: function() {
      var element = this.element;
      element.addClass('js');

      /* keyboard / skiplinks */

      element.find('a, *[tabindex]').on('blur', function() {
        element.removeClass('focus');
      });

      element.find('a, *[tabindex]').on('focus', function() {
        element.addClass('focus');
      });

      /* menu */

      var menuBox = this.element.find('.menu_box');

      element.on('click', '.menu_toggle', function() {
        element.toggleClass('menu_box_active');
        return false;
      });

      element.find('.navigation_top').on('click', function() {
        if (!$(this).hasClass('deactivated')) {
          element.removeClass('menu_box_active');
        }
      });

      element.find('.volume').volumeSlider({
        orientation: 'v'
      });

      element.find('.fullscreen').fullscreenButton();
      element.find('.parent_page').parentPageButton();
      element.find('.navigation_top').topButton();

      /* close by clicking background */

      menuBox.on('click', function(event) {
        element.removeClass('menu_box_active');
      });

      menuBox.find('a, .fullscreen, .volume').on('click', function(event) {
        event.stopPropagation();
      });

      /* pages */

      element.on('click', 'ul a', function(e) {
        pageflow.slides.goToById($(this).data('link'));
        e.preventDefault();
      });

      $('.scroller', this.element).each(function () {
        var scrollerOptions = {
          mouseWheel: true,
          bounce    : false,
          probeType : 2,
          scrollY   : false,
          scrollX    : true
        };

        /*
          This is just a quick fix to detect IE10. We should
          refactor this condition if we decide to use Modernizr
          or another more global detection.
         */
        if (window.navigator.msPointerEnabled) {
          scrollerOptions.preventDefault = false;
        }

        var scroller = new IScroll(this, scrollerOptions);

        element.find('ul').pageNavigationList({
          scroller: scroller,
          scrollToActive: true
        });
      });

      pageflow.events.on('page:change', this.updateVisiblity, this);
      this.updateVisiblity();
    },

    _destroy: function() {
      pageflow.events.off(null, null, this);
    },

    updateVisiblity: function() {
      this.element.find('.scroller').toggle(this.element.find('ul a:not(.filtered)').length > 0);
    }
  });
}(jQuery));
