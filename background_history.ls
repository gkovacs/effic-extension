message_handlers = {
  'requestfields': (info, callback) ->
    {fieldnames} = info
    getfields fieldnames, callback
  'get_field_descriptions': (namelist, callback) ->
    field_info <- get_field_info()
    output = {}
    for x in namelist
      if field_info[x]? and field_info[x].description?
        output[x] = field_info[x].description
    callback output
}

console.log 'background_history running'

chrome.runtime.onMessageExternal.addListener (request, sender, sendResponse) ->
  console.log 'onMessageExternal'
  console.log request
  console.log 'sender for onMessageExternal is:'
  console.log sender
  {type, data} = request
  message_handler = message_handlers[type]
  if not message_handler?
    return
  #tabId = sender.tab.id
  message_handler data, (response) ~>
    console.log 'response is:'
    console.log response
    if sendResponse?
      sendResponse response
  return true # async response

