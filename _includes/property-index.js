/*
todo 


*/
//add a ready function
let whenDocumentReady = (f) => {
    /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
}

/*
This function handles the property select
*/
let propertySelectChange = (id, theElement) => {
    //clear the current element
    window.localStorage.currentDataItem = "";
    //store the ID
    window.localStorage.currentDataItemId = id;
    //store the table
    window.localStorage.mainTable = theTable;
    //find out which one we are going to.
    switch (theElement.value) {
        case "1":
            window.location.href = `/property/costs/`
            break;
        case "2":
            window.location.href = `/property/payments/`
            break;
        case "3":
            window.location.href = `/property/rental-agreements/`
            break;
        case "4":
            window.location.href = `/property/tokens/`
            break;
    }
}


whenDocumentReady(isReady = () => {

    let getTableDone = (res) => {
        //parse json
        res = JSON.parse(res);
        if (allowOnlyOne == 0)
            if (res.data.length == 0)
                document.getElementById('btn-create-cy').classList.remove('d-none');
        //get the datatable
        table = $('#dataTable').DataTable();
        for (var i = 0; i < res.data.length; ++i) {
            let theData = res.data[i];
            let deleteButton = "";
            let editButton = "";
            let propertySelect = "";
            //build the buttons
            let reportButton = `<a href="/property/report?id=${theData.id}" id="ep-${theData.name}-${i}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
    <i class="fas fa-eye fa-sm text-white-50"></i> Report</a>`

            if (user.isAdmin == 1) {

                editButton = `<a href="/${theTable}/edit?id=${theData.id}" class="d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-edit fa-sm text-white-50"></i> Edit</a>`
                deleteButton = `<a href="javascript:deleteTableItem(${theData.id},'api/database/table/','${theTable}')" class="d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-trash fa-sm text-white-50"></i> Delete</a>`
                propertySelect = `<select onchange="propertySelectChange(${theData.id},this)" class="form-select" aria-label="Default select example" name="propertySelect-${i}" id="propertySelect-${i}">
                <option value="0">Please select</option>
  <option value="1">Costs</option>
  <option value="2">Payments</option>
  <option value="3">Rental agreements</option>
 <option value="4">Token</option>

</select>`

                /*
                <option value="3">Owners</option>
                  
                  <option value="audi">Audi</option>
                  */
            }

            var rowNode = table
                .row.add([theData.id, theData.name, theData.createdAt, `${reportButton} ${editButton} ${deleteButton} ${propertySelect}`])
                .draw()
                .node().id = theData.id;

        }
        table.columns.adjust();
    }

    //show the body
    document.getElementById('showBody').classList.remove('d-none');

    //build the json
    url = adminUrl + `database/table?tablename=${theTable}&fields=${theFields}&getOnlyTableSchema=${getOnlyTableSchema}`
    xhrcall(1, url, "", "json", "", getTableDone, token)
})