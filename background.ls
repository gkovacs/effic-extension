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

/*
chrome.tabs.onActivated.addListener (activeInfo) ->
  chrome.tabs.query {}, (tabs) ->
    #console.log tabs
    #console.log [x for x in tabs when (x.selected and x.active and x.url? and x.url.indexOf('www.facebook.com') != -1)]
    is_on_facebook = [x for x in tabs when (x.selected and x.active and x.url? and x.url.indexOf('www.facebook.com') != -1)].length > 0
    console.log 'is_on_facebook ' + is_on_facebook
    for tab in tabs
      chrome.tabs.sendMessage tab.id, {type: 'onfacebook', data: is_on_facebook}
*/

