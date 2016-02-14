console.log 'facebook content script running'

time_started = Date.now()

root = exports ? this

#baseurl = 'https://localhost:8081'

getvar = (varname, callback) ->
  chrome.runtime.sendMessage {type: 'getvar', data: varname}, (data) ->
    if not data?
      if default_var_vals[varname]?
        data = default_var_vals[varname]
    callback data

console.log 'fetching baseurl'

baseurl <- getvar 'baseurl'
console.log 'baseurl is ' + baseurl
iframewidth <- getvar 'iframewidth'
console.log 'iframewidth is ' + iframewidth
iframeheight <- getvar 'iframeheight'
console.log 'iframeheight is ' + iframeheight
delayuntilinject <- getvar 'delayuntilinject'
console.log 'delayuntilinject is ' +  delayuntilinject

insertBeforeItem = (jfeeditem) ->
  #jfeeditem.before $('<div>').text('newfoobar')
  #quizid = randstr()
  /*
  jfeeditem.before $('<iframe>').css({
    width: '495px'
    height: '300px'
  }).attr('src', baseurl + '/facebook_message?time_started=' + time_started).attr('frameBorder', '0').addClass('feedlearnquiz').css({'box-shadow': '0 10px 5px -5px grey'})
  */
  block = $('<div>').css({
    'padding-bottom': '10px'
    'background-color': '#e9eaed'
  })
  iframe = $('<iframe>').css({
    width: iframewidth+'px'
    height: iframeheight+'px'
    'background-color': 'white'
  }).attr('src', baseurl + '/facebook_message?time_started=' + time_started).attr('frameBorder', '0').addClass('feedlearnquiz')#.css({'box-shadow': '0 10px 5px -5px grey'})
  iframe.appendTo(block)
  jfeeditem.before(block)
  #.attr('id', quizid)
  return

root.numitems = 0

insertIfMissing = ->
  for feeditem in document.querySelectorAll('.mbm._5jmm,.userContentWrapper._5pcr')
    #jfeeditem = $(feeditem)
    #if not jfeeditem.attr('feedlearninserted')
    if not feeditem.feedlearninserted
      #jfeeditem.attr('feedlearninserted', true)
      feeditem.feedlearninserted = true
      root.numitems += 1
      if root.numitems % 10 == 5
        insertBeforeItem $(feeditem)
  return

setTimeout ->
  setInterval ->
    insertIfMissing()
  , 1000
, 1000.0*delayuntilinject