/*global IScroll*/

(function($) {
  $.widget('pageflow.horizontalNavigationBar', {
    _create: function() {
      var menuScroller;

      var element = this.element;
      element.addClass('js');

      /* close by clicking background */

      element.on('mousedown touchstart', function(event) {
        var ignoreSelector = 'a, .volume, [tabindex]';
        var x = coord(event).pageX;
        var y = coord(event).pageY;

        if (!$(event.target).is(ignoreSelector) & !$(event.target).parents(ignoreSelector).length) {
          element.one('mouseup touchend', function(event) {
            if (Math.abs(coord(event).pageX - x) < 2 &&
                Math.abs(coord(event).pageY - y) < 2) {
              toggle(false);
            }
          });
        }

        function coord(event) {
          if (event.originalEvent.changedTouches && event.originalEvent.changedTouches[0]) {
            return event.originalEvent.changedTouches[0];
          }
          else {
            return event;
          }
        }
      });

      /* menu */

      var menuBox = this.element.find('.menu_box');

      function toggle(state) {
        element.toggleClass('menu_box_active', state);

        $('section.page').toggleClass('hidden_by_overlay', state);
        $('.slideshow .scroll_indicator').toggleClass('hidden', state);

        if (element.hasClass('menu_box_active')) {
          menuScroller.refresh();
          menuScroller.scrollTo(0, 0);
        }
      }

      element.on('click', '.menu_toggle', function(event) {
        toggle();
        event.preventDefault();
      });

      element.on('click', '.help', function(event) {
        toggle();
        event.preventDefault();

        pageflow.multimediaAlert.show();
      });

      $('body').keyup(function(e) {
        if (e.which === 27 && element.hasClass('menu_box_active')) {
          toggle(false);
        }
      });

      element.find('.navigation_top').on('click', function() {
        if (!$(this).hasClass('deactivated')) {
          toggle(false);
        }
      });

      element.find('.volume-control').volumeSlider({
        orientation: 'v'
      });
      element.find('.player_mute').muteButton();

      element.find('.fullscreen').fullscreenButton();
      element.find('.parent_page').parentPageButton();
      element.find('.navigation_top').topButton();

      $('.menu_box_scroller', this.element).each(function () {
        menuScroller = new IScroll(this, {
          preventDefault: false,
          mouseWheel: true,
          bounce    : false
        });
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
