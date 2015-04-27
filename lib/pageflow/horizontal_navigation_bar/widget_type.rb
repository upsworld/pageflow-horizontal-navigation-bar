module Pageflow
  module HorizontalNavigationBar
    class WidgetType < Pageflow::WidgetType
      def name
        'horizontal_navigation_bar'
      end

      def roles
        ['navigation']
      end
    end
  end
end
