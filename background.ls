message_handlers_std = {
  getvar: (varname, callback) ->
    callback localStorage.getItem(varname)
}

chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  {type, data} = request
  message_handler = message_handlers_std[type]
  if not message_handler?
    return
  #tabId = sender.tab.id
  message_handler data, (response) ~>
    console.log 'response is:'
    console.log response
    if sendResponse?
      sendResponse response
  return true # async response

