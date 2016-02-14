(function(){
  var message_handlers_std;
  message_handlers_std = {
    getvar: function(varname, callback){
      return callback(localStorage.getItem(varname));
    }
  };
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var type, data, message_handler, this$ = this;
    type = request.type, data = request.data;
    message_handler = message_handlers_std[type];
    if (message_handler == null) {
      return;
    }
    message_handler(data, function(response){
      console.log('response is:');
      console.log(response);
      if (sendResponse != null) {
        return sendResponse(response);
      }
    });
    return true;
  });
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
}).call(this);
