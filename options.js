(function(){
  var getvar, allvars, savechanges, out$ = typeof exports != 'undefined' && exports || this;
  getvar = function(varname){
    var data;
    data = localStorage.getItem(varname);
    if (data == null) {
      data = default_var_vals[varname];
    }
    return data;
  };
  allvars = ['baseurl', 'iframewidth', 'iframeheight', 'delayuntilinject'];
  out$.savechanges = savechanges = function(){
    var i$, ref$, len$, x, val, results$ = [];
    for (i$ = 0, len$ = (ref$ = allvars).length; i$ < len$; ++i$) {
      x = ref$[i$];
      val = $('#' + x).val();
      results$.push(localStorage.setItem(x, val.trim()));
    }
    return results$;
  };
  $(document).ready(function(){
    var i$, ref$, len$, x, results$ = [];
    $('#savechanges').click(savechanges);
    for (i$ = 0, len$ = (ref$ = allvars).length; i$ < len$; ++i$) {
      x = ref$[i$];
      results$.push($('#' + x).val(getvar(x)));
    }
    return results$;
  });
}).call(this);
