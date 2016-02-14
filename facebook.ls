console.log 'facebook content script running'

time_started = Date.now()

root = exports ? this

baseurl = 'https://localhost:8081'

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
    width: '495px'
    height: '400px'
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

setInterval ->
  insertIfMissing()
, 1000
