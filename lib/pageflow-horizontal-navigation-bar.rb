require 'pageflow/horizontal_navigation_bar/engine'

module Pageflow
  module HorizontalNavigationBar
    mattr_accessor :logo_link_url
    mattr_accessor :logo_link_text
    def self.plugin
      HorizontalNavigationBar::Plugin.new
    end

    def self.widget_type
      HorizontalNavigationBar::WidgetType.new
    end
  end
end
