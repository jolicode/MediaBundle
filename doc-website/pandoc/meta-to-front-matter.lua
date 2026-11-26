-- meta-to-front-matter.lua
function Pandoc(doc)
  local description
  doc.blocks = doc.blocks:walk({
    Div = function(el)
      if el.classes:includes("meta") then
        description = el.attributes.description
        return {}
      end
    end,
  })

  if description then
    doc.blocks:insert(1, pandoc.RawBlock("markdown", "---\ndescription: '" .. description:gsub("'", "''") .. "'\n---"))
  end

  return doc
end
