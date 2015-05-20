/*global IScroll*/

(function($) {
  $.widget('pageflow.horizontalNavigationBar', {
    _create: function() {
      var that = this;

      this.element.addClass('js');

      /* keyboard / skiplinks */

      that.element.find('a, *[tabindex]').on('blur', function() {
        that.element.removeClass('focus');
      });

      that.element.find('a, *[tabindex]').on('focus', function() {
        that.element.addClass('focus');
      });

      /* menu */

      var menuBox = this.element.find('.menu_box');

      this.element.on('click', '.menu_toggle', function() {
        menuBox.toggleClass('active');
        return false;
      });

      this.element.find('.volume').volumeSlider({
        orientation: 'v'
      });

      this.element.find('.fullscreen').fullscreenButton();
      this.element.find('.parent_page').parentPageButton();
      this.element.find('.navigation_top').topButton();

      this.element.find('.navigation_top').on('click', function() {
        if (!$(this).hasClass('deactivated')) {
          menuBox.removeClass('active');
        }
      });

      /* close by clicking background */

      menuBox.on('click', function(event) {
        menuBox.removeClass('active');
      });

      menuBox.find('a, .fullscreen, .volume').on('click', function(event) {
        event.stopPropagation();
      });

      /* pages */

      that.element.on('click', 'ul a', function(e) {
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

        $('ul', that.element).pageNavigationList({
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
