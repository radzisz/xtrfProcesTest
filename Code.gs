function doGet(e){
  testMe()  
}


function testMe(){
  MailApp.sendEmail("radzisz@gmail.com", "test", "test body")
}
