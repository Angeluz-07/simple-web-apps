items = [
    {
        "name": "pantalon de mujer",
        "price": "10",
        "stock": "100",
    },
    {
        "name": "pantalon de mujer extra",
        "price": "13",
        "stock": "120",
    },
    {
        "name": "short",
        "price": "5",
        "stock": "50",
    },
    {
        "name": "pantalon de hombre",
        "price": "10",
        "stock": "130",
    },

    {
        "name": "vermuda",
        "price": "8",
        "stock": "60",
    }
]

$(document).ready(function () {
    
    const columnMapping = [
        { letter: 'A', title: 'item' },
        { letter: 'B', title: 'entra' },
        { letter: 'C', title: 'inicia' },
        { letter: 'D', title: 'e + i' },
        { letter: 'E', title: 'queda' },
        { letter: 'F', title: 'vendido' },
        { letter: 'G', title: 'aparece' },
        { letter: 'H', title: 'price' },
        { letter: 'I', title: '$ venta' },
    ]

    function toDefaultItem(item) {
        result = {
            "item": item.name,
            "entra": 0,
            "inicia": item.stock,
            "e + i": "",//computed
            "queda": item.stock,
            "vendido": "",//computed
            "aparece": "",//computed
            "price": item.price,
            "$ venta": "",//computed
        }
        return result;
    }
    function itemsToData(items) {
        let result = items
            .map(toDefaultItem)
            .map((defaultItem, i) => {
                let column = i + 1;
                defaultItem["e + i"] = `= B${column} + C${column} `;
                defaultItem["vendido"] = `= D${column} - E${column} `;
                defaultItem["$ venta"] = `= F${column} * H${column} `;
                return defaultItem;
            }).map(Object.values);
        let rowTotal = ['', '', '', '', '','','', 'Total:', `=SUM(I1:I${items.length})`];
        result.push(rowTotal);
        return result;
    }
    var columns = [
        { title: 'item', width: 180 },
        { title: 'entra', width: 80 },
        { title: 'inicia', width: 80 },
        { title: 'e + i', width: 80 },
        { title: 'queda', width: 80 },
        { title: 'vendido', width: 80 },
        { title: 'aparece', width: 80 },
        { title: 'price', width: 80 },
        { title: '$ venta', width: 80 },
    ]


    var mainTable = jspreadsheet(document.getElementById('mainTable'), {
        data: itemsToData(items),
        columns: columns,
        selectionCopy: false,
        contextMenu: function () { },
        rowDrag: false,
        columnSorting: false,
        allowInsertRow: false,
        allowManualInsertRow: false,
        allowDeleteRow: false,
        allowInsertColumn: false,
        allowManualInsertColumn: false,
        allowDeleteColumn: false,

        updateTable: function(el, cell, col, row, source, value, id) {
            let readOnlyCols = [0,3,5,6,7,8]
            let readOnlyRows = [items.length+1]
            if (readOnlyCols.includes(col) || readOnlyRows.includes(row)) {
                cell.classList.add('readonly');
                cell.style["color"] = 'black';
                cell.style['background-color'] = '#F1F5F8';
            }
        } 
    });

    $('#refreshButton').click(function () {
        let data = itemsToData(items)
        mainTable.setData(data);

    });

    $('#saveButton').click(function () {
        let data = mainTable.getData();
        console.log(data);

    });

    // //get current date on yyyy-mm-dd format
    // function getCurrentDate() {
    //     let date = new Date($.now());
    //     let dateString = (date.getFullYear() + '-'
    //         + ('0' + (date.getMonth() + 1)).slice(-2)
    //         + '-' + ('0' + (date.getDate())).slice(-2));
    //     return dateString;
    // }


    // /*------------------------------WRAPPING AJAX CALLS---------------------------*/

    // function getData(url) {
    //     let request = $.ajax({
    //         url: url,
    //         type: "GET",
    //         dataType: "json",
    //     });
    //     return request;
    // }

    // function postData(url, data, headers) {
    //     let request = $.ajax({
    //         url: url,
    //         type: "POST",
    //         contentType: "application/json",
    //         headers: headers,
    //         data: JSON.stringify(data),
    //     });
    //     return request;
    // }




});