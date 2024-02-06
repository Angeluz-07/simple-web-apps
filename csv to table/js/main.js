$(document).ready(function () {

    $('#loadRawText').click(function () {

        var splitByLine = (s) => s.split('\n');
        var splitByComma = (s) => s.split(',');
        var headerToColum = (s) => ({ title: s });

        let rawText = $("#rawText").val().trim();
        if(!rawText){
            alert("input data no supplied");
            return;
        };
    
        let items = splitByLine(rawText);
        let data = items.map(splitByComma).map(l => l.map(s => s.trim()));

        let headers = data.shift();
        let columns = headers.map(headerToColum);

        new DataTable('#mainTable', {
            destroy: true,
            columns: columns,
            data: data
        });

        $("#noDataHelper").html("");
        alert("Data has been loaded");

    });


});