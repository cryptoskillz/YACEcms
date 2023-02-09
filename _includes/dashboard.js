//add a ready function
let whenDocumentReady = (f) => {
    /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
}

whenDocumentReady(isReady = () => {
    //set the property count
    //
    //show it
    let init = async () => {
        //done process
        let getCountDone = (res) => {
            //parse the response
            theCount = JSON.parse(res);
            //set the total
            document.getElementById("dashboardcounter").innerHTML = theCount.total;
            //remove the hidden class
            document.getElementById('showBody').classList.remove('d-none')

        }
        //set the url array
        let urls = [];
        //get the user
        const user = JSON.parse(window.localStorage.user);
        //build the XHR call
        const tmpUrl = `database/count?table=site&userId=${user.id}`
        const tmpXhrCalls = { "url": `${tmpUrl}`, "doneFunction": "getCountDone", "xhrType": 1 }
        //add it to the array
        urls.push(tmpXhrCalls);
        //loop through the urls and call them
        //loop through the calls
        for (var i = 0; i < urls.length; ++i) {
            //console.log(`processing XHR call ${urls[i].url} :  ${urls[i].doneFunction}`)
            let xhrRes = await xhrcall(urls[i].xhrType, urls[i].url, "", "json", "", eval(urls[i].doneFunction), token)
        }
    }
    init();
});