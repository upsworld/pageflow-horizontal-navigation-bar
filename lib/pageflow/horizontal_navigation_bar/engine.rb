module Pageflow
  module HorizontalNavigationBar
    class Engine < Rails::Engine
      isolate_namespace Pageflow::HorizontalNavigationBar

      config.autoload_paths << File.join(config.root, 'lib')
    end
  end
end
