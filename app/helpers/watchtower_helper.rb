module WatchtowerHelper
  def short_distance(timestamp)
    result = ""
    format = /^(less than|about|over)* *(a|\d+) *(.+)$/
    to_parse = distance_of_time_in_words_to_now(timestamp)
    return to_parse if (parsed = to_parse.scan(format).flatten.compact).empty?
    
    measurement = parsed.pop
    amount = parsed.pop
    approximation = parsed.pop unless parsed.empty?
    
    if approximation
      result << case approximation
      when "less than"
        "&lt;"
      when "about"
        "&asymp;"
      when "over"
        "&gt;"
      end
    end
    
    result << ((amount =~ /a/).nil? ? amount : "1")
    
    result << case measurement
    when /month/
      "mo"
    else
      measurement.strip.split(//).first
    end
    
    result
  end
end