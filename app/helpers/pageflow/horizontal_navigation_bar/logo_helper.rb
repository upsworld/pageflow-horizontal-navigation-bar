module Pageflow
  module HorizontalNavigationBar
    module LogoHelper
      def horizontal_navigation_bar_logo_link(entry)
        if HorizontalNavigationBar.logo_link_url.present?
          link_to(HorizontalNavigationBar.logo_link_text,
                  HorizontalNavigationBar.logo_link_url,
                  target: '_blank',
                  class: 'logo')
        else
          content_tag(:div, '', class: 'logo')
        end
      end
    end
  end
end
