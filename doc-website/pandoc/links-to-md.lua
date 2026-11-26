-- links-to-md.lua
function Link(el)
  el.target = string.gsub(el.target, "%.rst", ".md")
  return el
end
