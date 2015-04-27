//= require_self
//= require ./horizontal_navigation_bar/widget

pageflow.widgetTypes.register('horizontal_navigation_bar', {
  enhance: function(element) {
    element.horizontalNavigationBar();
  }
});