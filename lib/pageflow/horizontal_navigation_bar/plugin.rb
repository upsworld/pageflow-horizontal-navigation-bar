module Pageflow
  module HorizontalNavigationBar
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.features.register('horizontal_navigation_bar') do |config|
          config.widget_types.register(HorizontalNavigationBar.widget_type)
        end
      end
    end
  end
end
