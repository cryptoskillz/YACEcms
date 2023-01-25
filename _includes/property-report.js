let whenDocumentReady = (f) => {
    /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
}

let propertydetails = "";
let propertycontracts = ""; //get owner info
let propertyrentals = "";
let propertyowners = "";
let propId = 1;
let url = "";

whenDocumentReady(isReady = () => {
    /*
        This is for the unit testing it basically tells us that we are using cypress and to hard code the localstorage.
    */
    if (window.location.pathname != `/${level1name}/`)  {
        var ua = window.navigator.userAgent;
        if (ua == `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/10.11.0 Chrome/106.0.5249.51 Electron/21.0.0 Safari/537.36`) {
            window.localStorage.currentDataItem = `{"id":1,"name":"DCONDO","currentlyRented":1,"state":0,"internationalCost":52087,"createdAt":"2023-01-24 13:08:31"}`
            window.localStorage.currentDataItemId = '1';
            window.localStorage.mainTable = "property";

        }
        //console.log("ua")
        console.log(ua)
    }

    //get the main property details
    let propertyDone = (res) => {
        res = JSON.parse(res);
        //debug
        //console.log(res);
        //console.log(res.agreements.length);
        //formatCurencyUSD

        //set the title
        document.getElementById('propertyNameTitle').innerHTML = res.property.name;
        document.getElementById('propertyNameTitle').href = "javascript:history.back()";

        //main property details
        let table = `<table class="table">`
        table = addTableRow("Name", res.property.name, table);
        table = addTableRow("Cost", formatCurencyUSD(res.property.internationalCost), table);
        table = addTableRow("Taxes", formatCurencyUSD(res.property.internationalTaxesCost), table);
        table = addTableRow("Currency", res.property.internationalCurrency, table);
        if (res.token == undefined)
            table = addTableRow("Contract", `N/A`, table);
        else
            table = addTableRow("Contract", `<a href="${res.token.blockExplorerUrl}" target="_blank">${res.token.contractAddress}</a>`, table);
        table = table + "</table>";
        table = table + "</table>";
        //console.log(table)
        let theTable = document.getElementById("property-table");
        theTable.innerHTML = table;

        //rental aggrements
        table = $('#rental-aggrement-table').DataTable();
        for (var i = 0; i < res.agreements.length; ++i) {
            let tmp = res.agreements[i];
            //set the active state
            let isActive = "Yes"
            if (tmp.active == 0)
                isActive = "No"
            //add a table
            var rowNode = table
                .row.add([tmp.id, tmp.name, tmp.amount, tmp.deposit, tmp.startDate, tmp.endDate, isActive])
                .draw()
                .node().id = tmp.id;
        }
        table.columns.adjust();

        //owners
        table = $('#ownerstable').DataTable();
        for (var i = 0; i < res.owners.length; ++i) {
            //get the owner
            let owner = res.owners[i];
            //set the percentage
            let per = owner.tokenAmount / res.token.totalSupply;
            per = per * 100
            per = Math.round(per);
            //build the address
            let address = `<a href="${owner.address}" target="_blank">view</a>`
            //format the currency 
            let famount = owner.tokenAmount;
            //set the amount
            let amount = `${famount} (${per}%)`
            //add the table row
            var rowNode = table
                .row.add([owner.id, owner.name, owner.email, address, amount])
                .draw()
                .node().id = owner.id;
        }
        table.columns.adjust();

        //payments
        table = $('#paidintable').DataTable();
        let total = 0;
        let nettotal = 0;
        for (var i = 0; i < res.payments.length; ++i) {
            let tmp = res.payments[i];
            total = total + tmp.amountInternational;
            let famount = formatCurencyUSD(tmp.amountInternational);
            var rowNode = table
                .row.add([tmp.id, tmp.type, tmp.name, famount, tmp.datePaid])
                .draw()
                .node().id = tmp.id;
        }
        table.columns.adjust();
        //update the total
        document.getElementById("paidintotal").innerHTML = formatCurencyUSD(total);
        //reset the total
        nettotal = total;
        total = 0;
        //costs
        table = $('#paidouttable').DataTable();
        for (var i = 0; i < res.costs.length; ++i) {
            let tmp = res.costs[i];
            total = total + tmp.amountInternational;
            let famount = formatCurencyUSD(tmp.amountInternational);
            var rowNode = table
                .row.add([tmp.id, tmp.type, tmp.name, famount, tmp.datePaid])
                .draw()
                .node().id = tmp.id;
        }
        table.columns.adjust();
        //update the total
        document.getElementById("paidouttotal").innerHTML = formatCurencyUSD(total);
        nettotal = nettotal - total;
        total = 0;

        //distribution

        //reset the total
        total = 0;
        //costs
        table = $('#disttable').DataTable();
        for (var i = 0; i < res.distributions.length; ++i) {
            let tmp = res.distributions[i];
            total = total + tmp.amountInternational;
            let famount = formatCurencyUSD(tmp.amountInternational);
            var rowNode = table
                .row.add([tmp.id, tmp.name, famount, tmp.datePaid])
                .draw()
                .node().id = tmp.id;
        }
        table.columns.adjust();
        //update the total
        document.getElementById("totaldist").innerHTML = formatCurencyUSD(total);
        nettotal = nettotal - total;
        document.getElementById("totalleft").innerHTML = formatCurencyUSD(nettotal);
        //show it
        document.getElementById("propertydiv").classList.remove("d-none");
        document.getElementById('showBody').classList.remove('d-none')
    }
    xhrcall(1, apiUrl + `properties/report?id=${window.localStorage.currentDataItemId}`, "", "json", "", propertyDone, "")
})