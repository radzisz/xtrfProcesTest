function executeDaily(){ 
  sendEmail("dr")  
}


function doGet(e) {
  var result = {}
  result.error = false  
  try {   
    var userName = _getMandatoryParam("userName",e);     
    sendEmail(userName)
    result.data = "Sent to: " + userName
  } catch (e) {
    result.error = true;   
    result.data =  "FAIL! - " + e     
  } 
  
  return ContentService.createTextOutput(JSON.stringify(result));
   
  
  function _getMandatoryParam(paramName, e) {
    if(typeof e !== 'undefined') {     
      var value = e.parameter[paramName];
      if (value) return value;
    }
    throw "Mandatory param '" + paramName  + "' not set!"
  }
  
}



function sendEmail(userName)  {
  var email = userName + "@xtrf.eu"
  MailApp.sendEmail(email, "test", "test body")
  return HtmlService.createHtmlOutput("Emai sent to: " + email)
}


