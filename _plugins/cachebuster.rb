require 'digest/sha1'

# https://gist.github.com/daneden/7027258
module Jekyll
  class CacheBuster < Liquid::Tag

    def render(context)
      "#{Digest::SHA1.hexdigest(Time.now.to_s)}"
    end
  end
end

Liquid::Template.register_tag('bust_cache', Jekyll::CacheBuster)
