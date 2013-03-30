define(["jquery","mustache"], function($,mustache) {
  var url_base = "http://reader.livedoor.com";
  var auth_url = url_base + "/apps/authorize";
  var conn = new LDR.Connect(auth_url);

  $("#authorize_button").click(function(){
    if (conn.authorized()){
      console.log("You've authorized.");
    } else {
      conn.authorize({
        client_id: location.href,
        name: "api test",
        expires_in: 3600 * 3
      });
    }
  });

  $("#clear_button").click(function(){
    conn.token = null;
    conn.token_store.clear();
  });

  var compiledTemplate = mustache.compile($('#tpl').html());
  $("article.api").each(function(){
    var api_url = $(this).find("h3").text();
    // api definition
    var params = $(this).find(".parameters");
    if (params) {
      var definition = '{"params":' + params.text() + '}';
      $(this).append(compiledTemplate($.parseJSON(definition.replace(/&quot;/ig,'"'))));
      var api_name = api_url.replace(/\//ig,'_');
      $(this).attr("name", api_name);
      // api post 
      var apiForm = $(this).find('form[name="apiForm"]');
      $(this).find('input[name="post"]').click(function(){
        var callback = function(res){
          $('article.api[name="' + api_name + '"]').find(".result").html("<pre>"+JSON.stringify(res, null, 4) + "</pre>");
        };
        var errback = callback;
        conn.request("POST", api_url + "?" + $(apiForm).serialize(), {}, callback, errback);
      });
    }
  });
});