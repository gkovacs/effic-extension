(function(){
  var time_started, root, getvar;
  console.log('facebook content script running');
  time_started = Date.now();
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
        var insertBeforeItem, insertIfMissing;
        console.log('iframeheight is ' + iframeheight);
        insertBeforeItem = function(jfeeditem){
          /*
          jfeeditem.before $('<iframe>').css({
            width: '495px'
            height: '300px'
          }).attr('src', baseurl + '/facebook_message?time_started=' + time_started).attr('frameBorder', '0').addClass('feedlearnquiz').css({'box-shadow': '0 10px 5px -5px grey'})
          */
          var block, iframe;
          block = $('<div>').css({
            'padding-bottom': '10px',
            'background-color': '#e9eaed'
          });
          iframe = $('<iframe>').css({
            width: iframewidth + 'px',
            height: iframeheight + 'px',
            'background-color': 'white'
          }).attr('src', baseurl + '/facebook_message?time_started=' + time_started).attr('frameBorder', '0').addClass('feedlearnquiz');
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
        return setInterval(function(){
          return insertIfMissing();
        }, 1000);
      });
    });
  });
}).call(this);
