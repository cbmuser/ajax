class ajax {

  constructor(response,conf,size) {

  this.response = response; 
  switch (conf)
  {
   case "POST": this.func = "POST"; 
   break;
   default: this.func = "GET"; 
   break;
    
  }
   this.size = size; 
 }

/* the configurable requester */

request(source)
{
    var request = new XMLHttpRequest();
    var completed_state = 4;
    var response = this.response;
    document.getElementById(response).innerHTML ='<img src="images/loader.gif" />';
    request.onreadystatechange = function()
    {

        if ( request.readyState == completed_state )
        {
    document.getElementById(response).innerHTML = request.responseText;
            request.open( "DELETE", null );
        }
    }
    request.open( this.func,source);
    request.send();
}

/* file uploader */

async uploadFile() {
  let formData = new FormData(); 

/* some limits and error-handling */

  if (!fileupload.files[0])
   { alert("Please first choose a picture !"); 
     return; 
   }
  formData.append("file", fileupload.files[0]);
  if (fileupload.files[0]['size'] > this.size)
   { alert("Sorry, only "+this.size+" Bytes"); 
     return; 
   }
 switch (fileupload.files[0]['type'])

   { case "image/jpeg" : true;
     break;    
     case "image/png" : true;
     break;    
     case "image/gif" : true;
     break;    
     default: false; alert("Sorry, only JPEG/PNG/GIF in "+this.size+" Bytes !"); return;  }

/* all passed, upload */

   document.getElementById(this.response).innerHTML = '<img src="images/loader.gif" />';
  await fetch('php/upload.php', {
    method: "POST", 
    body: formData
  }); 

/* show image for demonstration, maybe kicked */

   let image = "upload/"+fileupload.files[0]['name'];
   document.getElementById(this.response).innerHTML = '<img src='+image+' />';

  }
}


