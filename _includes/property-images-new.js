 //add a ready function
 let whenDocumentReady = (f) => {
     /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
 }

//upload the image
 let uploadIt = () => {

    //process the one time url from the server
     let oneTimeUrlDone = (res) => {
         //get the file
         const fileInput = document.getElementById('file-input');
         const file = fileInput.files[0];
         //todo: update XRH call to handle files
         //proces the file and and send it to the one time url 
         const xhr = new XMLHttpRequest();
         xhr.open('POST', res, true);
         const formData = new FormData();
         formData.append('file', file);
         xhr.onload = function() {
            //check it was ok
             if (this.status === 200) {
                //get the response
                 const response = JSON.parse(this.response)
                 //check there is data to submit
                 let xhrDone = (res2) => {
                     //show the preview 
                     document.getElementById('image-preview-div').classList.remove('d-none')
                     document.getElementById('image-preview').src = response.result.variants[0]
                     //show the messsage
                     showAlert("Image has been added", 1, 0, 1);

                 }
                 //get the id
                 let id = getUrlParamater('id');
                 //build the JSON
                 let theJson = {
                     propertyId: id,
                     filename: response.result.filename,
                     cfid: response.result.id,
                     url: response.result.variants[0],
                     draft: 0
                 }
                 let bodyObj = {
                     table: "property_images",
                     tableData: theJson
                 }
                 let bodyObjectJson = JSON.stringify(bodyObj);
                 //check we have valid data to submit
                 //post the record
                 xhrcall(0, apiUrl + `database/table/`, bodyObjectJson, "json", "", xhrDone, token)
             }
         };
         xhr.send(formData);
     }

     //check that an image has been selected
     if (document.getElementById("file-input").files.length == 0) {
         //show error message
         showAlert('Select an image', 2)
     } else {
         //get a one time upload url
         xhrcall(1, apiUrl + 'admin/image/', '', '', '', oneTimeUrlDone, '', '');
     }
 }


 whenDocumentReady(isReady = () => {
     //show the body
     document.getElementById('showBody').classList.remove('d-none');




 });