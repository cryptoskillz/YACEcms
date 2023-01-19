 //add a ready function
 let whenDocumentReady = (f) => {
     /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
 }

let lookUpData = [];
let schemaData;


 whenDocumentReady(isReady = () => {

    /*
     if (typeof loadMessage != 'undefined')
         showAlert(loadMessage.message, loadMessage.type, loadMessage.timeout)

     let getTableDone = (res) => {




         //parse the repsonse
         res = JSON.parse(res)
         //set the form html
         let formHtml = "";
         //loop through the scema
         for (var i = 0; i < res.schema.length; ++i) {
             //pass in the field name and the values
             //note: at the moment we pass in all the values, we could make this neater by adding the schema info into the 
             //      main data result but this would break standard sqlite api return formats so may not go ahead and do that.
             formHtml = formHtml + buildFormElement(res.schema[i], res.data[0]);
         }
         //set table name
         document.getElementById('formTableName').value = theTable;
         //set the form
         document.getElementById('formInputs').innerHTML = formHtml;
         //show the body div
         document.getElementById('showBody').classList.remove('d-none');
     }

     //get the id
     let id = getUrlParamater('id');

     //set table header
     if (typeof overRideTitle != 'undefined') {
         document.getElementById('data-header').innerHTML = overRideTitle;
     } else {
         //set the tmpName
         let tmpName = theTable.replace("_", " ");
         document.getElementById('data-header').innerHTML = `add a new ${tmpName}`
     }
     //get the table results for this level.
     let getTableData = () => {
         //call the data
         url = apiUrl + `database/table?tablename=${theTable}&fields=${theFields}&getOnlyTableSchema=0&id=${id}`
         xhrcall(1, url, "", "json", "", getTableDone, token);
     }

     let getLookUpDone = (res) => {
         res = JSON.parse(res);
         lookUpData = res;
         getTableData();
     }
    if (typeof lookUps === 'undefined') {
        var lookUps = "";
    }
    
     if (lookUps != "") {
         lookUps = JSON.stringify(lookUps);
         //call the data
         url = apiUrl + `database/lookUp?theData=${lookUps}&id=${window.localStorage.currentDataItemId}`
         xhrcall(1, url, "", "json", "", getLookUpDone, token);
     } else {
         getTableData();
     }
     */

     //set a url array
    let urls = [];
    //process the schema
    let getSchemaDone = (res) => {
        //console.log(res);
        schemaData = JSON.parse(res);
        //console.log(schemaData);
    }
    //process the look up 
    //note: not sure if this is required in the add new page. 
    let lookUpDone = (res) => {
        console.log(res)
    }

    //process the data.
    let getTableDone = (res) => {
        //parse the repsonse
         res = JSON.parse(res)
         //set the form html
         let formHtml = "";
         //loop through the scema
         for (var i = 0; i < schemaData.length; ++i) {
             //pass in the field name and the values
             //note: at the moment we pass in all the values, we could make this neater by adding the schema info into the 
             //      main data result but this would break standard sqlite api return formats so may not go ahead and do that.
             formHtml = formHtml + buildFormElement(schemaData[i], res.data[0]);
         }
         //set table name
         document.getElementById('formTableName').value = theSettings.table;
         //set the form
         document.getElementById('formInputs').innerHTML = formHtml;
         //show the body div
         document.getElementById('showBody').classList.remove('d-none');
    }

    let init = async (theSettings) => {
        //build the schema URL
        let tmpUrl = apiUrl + `database/schema?tablename=${theSettings.table}&fields=${theSettings.fields}&id=${window.localStorage.currentDataItemId}`
        let tmpXhrCalls = { "url": `${tmpUrl}`, "doneFunction": "getSchemaDone", "xhrType": 1 }
        urls.push(tmpXhrCalls);
        //build the look up url
        //let tmpLookUpUrl = "";
        if ((theSettings.lookUps != undefined) && (theSettings.lookUps != "")) {
            //turn it into a string
            const lookUps = JSON.stringify(theSettings.lookUps)
            //build the url
            const tmpUrl = apiUrl + `database/lookUp?theData=${lookUps}`
            //create the json objecr
            const tmpXhrCalls = { "url": `${tmpUrl}`, "doneFunction": "lookUpDone", "xhrType": 1 }
            //add it to the array
            urls.push(tmpXhrCalls)
            //set the look up url
            //tmpLookUpUrl = `lookUps=${lookUps}`;
        }

        //build the table call
        tmpUrl = apiUrl + `database/table?tablename=${theSettings.table}&fields=${theSettings.fields}&recordId=${window.localStorage.currentDataItemId}`
        tmpXhrCalls = { "url": `${tmpUrl}`, "doneFunction": "getTableDone", "xhrType": 1 }
        urls.push(tmpXhrCalls)

        //loop through the urls and call them
        for (var i = 0; i < urls.length; ++i) {
            console.log(`processing XHR call ${urls[i].url}`)
            let xhrRes = await xhrcall(urls[i].xhrType, urls[i].url, "", "json", "", eval(urls[i].doneFunction), token)
        }

    }
    init(theSettings);

 });