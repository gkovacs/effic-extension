(function(){
  var time_started, root, getvar;
  console.log('facebook content script running');
  time_started = Date.now();
  /*
  was_on_facebook = true
  chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
    if request.type == 'onfacebook'
      is_on_facebook = request.data
      if !was_on_facebook and is_on_facebook
        time_started := Date.now()
      was_on_facebook := is_on_facebook
  */
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  getvar = function(varname, callback){
    return chrome.runtime.sendMessage({
      type: 'getvar',
      data: varname
    }, function(data){
      if (data == null) {
        if (default_var_vals[varname] != null) {
          data = default_var_vals[varname];
        }
      }
      return callback(data);
    });
  };
  console.log('fetching baseurl');
  getvar('baseurl', function(baseurl){
    console.log('baseurl is ' + baseurl);
    return getvar('iframewidth', function(iframewidth){
      console.log('iframewidth is ' + iframewidth);
      return getvar('iframeheight', function(iframeheight){
        console.log('iframeheight is ' + iframeheight);
        return getvar('delayuntilinject', function(delayuntilinject){
          var insertBeforeItem, insertIfMissing;
          console.log('delayuntilinject is ' + delayuntilinject);
          root.itemtype_counter = 0;
          insertBeforeItem = function(jfeeditem){
            /*
            jfeeditem.before $('<iframe>').css({
              width: '495px'
              height: '300px'
            }).attr('src', baseurl + '/facebook_message?time_started=' + time_started).attr('frameBorder', '0').addClass('feedlearnquiz').css({'box-shadow': '0 10px 5px -5px grey'})
            */
            var linkurl, block, iframe;
            linkurl = baseurl + '/facebook_message?time_started=' + time_started;
            if (root.itemtype_counter % 2 === 1) {
              linkurl = baseurl + '/facebook_message_links';
            }
            root.itemtype_counter += 1;
            block = $('<div>').css({
              'padding-bottom': '10px',
              'background-color': '#e9eaed'
            });
            iframe = $('<iframe>').css({
              width: iframewidth + 'px',
              height: iframeheight + 'px',
              'background-color': 'white'
            }).attr('src', linkurl).attr('frameBorder', '0').addClass('feedlearnquiz');
            iframe.appendTo(block);
            jfeeditem.before(block);
          };
          root.numitems = 0;
          insertIfMissing = function(){
            var i$, ref$, len$, feeditem;
            for (i$ = 0, len$ = (ref$ = document.querySelectorAll('.mbm._5jmm,.userContentWrapper._5pcr')).length; i$ < len$; ++i$) {
              feeditem = ref$[i$];
              if (!feeditem.feedlearninserted) {
                feeditem.feedlearninserted = true;
                root.numitems += 1;
                if (root.numitems % 10 === 5) {
                  insertBeforeItem($(feeditem));
                }
              }
            }
          };
          return setTimeout(function(){
            return setInterval(function(){
              return insertIfMissing();
            }, 1000);
          }, 1000.0 * delayuntilinject);
        });
      });
    });
  });
}).call(this);
