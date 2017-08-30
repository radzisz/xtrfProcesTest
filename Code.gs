function doGet(e){
  var userName = e.parameter["userName"]
  sendEmail(userName)  
}


function sendEmail(userName)  {
  var email = userName + "@xtrf.eu"
  MailApp.sendEmail(email, "test", "test body")
  return HtmlService.createHtmlOutput("Emai sent to: " + email)
}
