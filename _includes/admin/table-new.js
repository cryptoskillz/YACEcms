//add a ready function
let whenDocumentReady = (f) => {
    /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
}

let lookUpData = [];

whenDocumentReady(isReady = () => {


    //process the result from the table API call.
    let getTableDone = (res) => {
        res = JSON.parse(res);
        //debug
        //console.log(res)
        let formHtml = "";
        for (var i = 0; i < res.schema.length; ++i) {
            //console.log(res[i].name)
            formHtml = formHtml + buildFormElement(res.schema[i]);
        }
        //set table name
        document.getElementById('formTableName').value = theTable;
        //set the inputs
        document.getElementById('formInputs').innerHTML = formHtml;
        //show the body div
        document.getElementById('showBody').classList.remove('d-none');
    }

    //set table header
    if (typeof overRideTitle != 'undefined')
    {
        document.getElementById('data-header').innerHTML  = overRideTitle;
    }
    else {
        //set the tmpName
        let tmpName = theTable.replace("_", " ");
        document.getElementById('data-header').innerHTML = `add a new ${tmpName}`
    }

    //get the table results for this level.
    let getTableData = () => {
        //call the data
        url = apiUrl + `database/table?tablename=${theTable}&fields=${theFields}&getOnlyTableSchema=1`
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
        xhrcall(1, apiUrl + `database/lookUp?theData=${lookUps}`, "", "json", "", getLookUpDone, token);
    } else {
        getTableData();
    }



});