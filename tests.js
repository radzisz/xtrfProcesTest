function performTests() {
  var test = initTests()
       
  test('checkAPICallWithValidParameters', function(t){
    //GIVEN
    var userName = "dr"
    var httpParam = "userName="+userName
    //WHEN
    var result = execute_HTTP_GET(httpParam)
    //THEN
    t.ok(!result.error, 'result expected to not to be en error: ' + JSON.stringify(result))
    t.equal(result.data, "Sent to: " + userName, "check result message")
  })

  test('checkAPICallWithInValidParameters', function(t){
    //GIVEN
    var httpParam = ""
    //WHEN
    var result = execute_HTTP_GET(httpParam)
    //THEN
    t.ok(result.error, 'result expected to be en error: ' + JSON.stringify(result), "check error status")
    t.equal(result.data, "FAIL! - Mandatory param 'userName' not set!", " - check error message")
  })
  
  
  test.finish()   

     
  
  
  function initTests(){
    if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
      eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/v0.3.0/src/gas-tap-lib.js').getContentText())
    } // Class GasTap is ready for use now!  
    return new GasTap()
  }
  
  
  function execute_HTTP_GET(params){
    return execute_locahost_HTTP(params, "GET")
  }
  
  
  
  function execute_locahost_HTTP(params, httpOperation, payload){  
    var url = ScriptApp.getService().getUrl();      
    var options =
        {
          "method"  : httpOperation,   
          "followRedirects" : true,
          "muteHttpExceptions": true
        };
    if (payload){
      options.payload = payload
    }
    if(params) {url = url + "?" + params}
    var result = UrlFetchApp.fetch(url, options);
    
    Logger.log(result.getResponseCode() + " :" +result.getContentText())
    if (result.getResponseCode() == 200) { 
      var json = JSON.parse(result.getContentText())
      return json
    }  else {
      throw "internal error " + result.getContentText() 
    }     
  }
  
  
}
