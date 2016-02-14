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
}).call(this);
