getvar = (varname) ->
  data = localStorage.getItem(varname)
  if not data?
    data = default_var_vals[varname]
  return data

allvars = <[ baseurl iframewidth iframeheight delayuntilinject ]>

export savechanges = ->
  for x in allvars
    val = $('#' + x).val()
    localStorage.setItem(x, val)

$(document).ready ->
  $('#savechanges').click savechanges
  for x in allvars
    $('#' + x).val getvar(x)
