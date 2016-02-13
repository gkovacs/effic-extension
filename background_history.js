(function(){
  var message_handlers;
  message_handlers = {
    'requestfields': function(info, callback){
      var fieldnames;
      fieldnames = info.fieldnames;
      return getfields(fieldnames, callback);
    },
    'get_field_descriptions': function(namelist, callback){
      return get_field_info(function(field_info){
        var output, i$, ref$, len$, x;
        output = {};
        for (i$ = 0, len$ = (ref$ = namelist).length; i$ < len$; ++i$) {
          x = ref$[i$];
          if (field_info[x] != null && field_info[x].description != null) {
            output[x] = field_info[x].description;
          }
        }
        return callback(output);
      });
    }
  };
  console.log('background_history running');
  chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse){
    var type, data, message_handler, this$ = this;
    console.log('onMessageExternal');
    console.log(request);
    console.log('sender for onMessageExternal is:');
    console.log(sender);
    type = request.type, data = request.data;
    message_handler = message_handlers[type];
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
}).call(this);
