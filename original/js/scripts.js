var jsonLayout = {
    "document": [
        {
            "field": "nome",
            "uuid" : "",
            "label": {
                "color": "red",
                "font": "Arial",
                "size": "12",
                "template": "",
                "break": false,
                "bold": false,
                "italic": false
            }
            ,
            "value": {
                "color": "red",
                "font": "Arial",
                "size": "12",
                "template": "",
                "link": false,
                "bold": false,
                "italic": false,
                "startWith": "",
                "contains": ""
            }
        }
    ]
}
var jsonFields = []

window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

const form = document.getElementById("uploadForm");

async function uploadFile() {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    await fetch('http://localhost:3000/upload', {
        method: "POST",
        body: formData
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let sectionMain = document.getElementById("sectionMain");
            sectionMain.style['pointer-events'] = 'auto'
            sectionMain.style['opacity'] = '1'
            let sectionLayout = document.getElementById("sectionLayout");
            sectionLayout.style['pointer-events'] = 'auto'
            sectionLayout.style['opacity'] = '1'

            jsonFields = data
            populateSelectCampos(data)

        })
}

function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function populateSelectCampos(jsonData) {
    let inputCampos = document.getElementsByName("inputCampos")
    Array.from(inputCampos).forEach(input => {
        Array.from(jsonData).forEach(json => {
            let opt = document.createElement("option");
            opt.value = json
            opt.text = json

            input.add(opt, null)
        })

    })

}

function addSection2Layout() {
    let section = {
        "field": "",
        "label": {
            "color": "",
            "font": "",
            "size": "",
            "template": "",
            "break": false,
            "bold": false,
            "italic": false
        }
        ,
        "value": {
            "color": "",
            "font": "",
            "size": "",
            "template": "",
            "link": false,
            "bold": false,
            "italic": false,
            "startWith": "",
            "contains": ""
        }
    }
    section['field'] = document.getElementById('inputCampos').value
    section['uuid'] = generateUUID()
    section['label']['color'] = document.getElementById('inputColor').value
    section['label']['font'] = document.getElementById('inputFont').value
    section['label']['size'] = document.getElementById('inputSize').value
    section['label']['template'] = document.getElementById('inputTemplate').value
    section['label']['break'] = document.getElementById('inputBreak').checked
    section['label']['bold'] = document.getElementById('inputBold').checked
    section['label']['italic'] = document.getElementById('inputItalic').checked

    section['value']['color'] = document.getElementById('inputValueColor').value
    section['value']['font'] = document.getElementById('inputValueFont').value
    section['value']['size'] = document.getElementById('inputValueSize').value
    section['value']['template'] = document.getElementById('inputValueTemplate').value
    section['value']['link'] = document.getElementById('inputValueLink').checked
    section['value']['bold'] = document.getElementById('inputValueBold').checked
    section['value']['italic'] = document.getElementById('inputValueItalic').checked
    section['value']['startWith'] = document.getElementById('inputValueStartWith').value
    section['value']['contains'] = document.getElementById('inputValueContains').value

    json2HTMLTable(section)

}

function json2HTMLTable(jsonData) {
    var table = document.getElementById('tableLayout')

    var tr = table.insertRow(-1)
    var columnName = tr.insertCell(-1)
    columnName.innerHTML = jsonData['field']

    var columnJson = tr.insertCell(-1)

    let btn = document.createElement('button')
    btn.appendChild(document.createTextNode("código"))
    btn.addEventListener('click', () => {
        alert(JSON.stringify(jsonData))
    })
    columnJson.appendChild(btn);

    let btnDelete = document.createElement('button')
    btnDelete.appendChild(document.createTextNode("excluir"))
    btnDelete.addEventListener('click', () => {
        btnDelete.closest('tr').remove()
    })
    columnJson.appendChild(btnDelete);

    let btnEdit = document.createElement('button')
    btnEdit.appendChild(document.createTextNode("editar"))
    btnEdit.addEventListener('click', () => {
        alert('not implemented yet')
    })
    columnJson.appendChild(btnEdit);

    let btnUp = document.createElement('button')
    btnUp.appendChild(document.createTextNode("up"))
    btnUp.addEventListener('click', () => {
        alert('not implemented yet')
    })
    columnJson.appendChild(btnUp);

    let btnDown = document.createElement('button')
    btnDown.appendChild(document.createTextNode("down"))
    btnDown.addEventListener('click', () => {
        alert('not implemented yet')
    })
    columnJson.appendChild(btnDown);

    let divCode = document.createElement('div')
    divCode.innerText = JSON.stringify(jsonData)
    divCode.style.display = 'none'
    columnJson.appendChild(divCode)

}

function callExport(type) {
    var table = document.getElementById('tableLayout')
    Array.from(table.rows).forEach(row => {
        let html  = row.cells[1].getElementsByTagName('div')
        if (html[0] != undefined){
            jsonLayout['document'].push(JSON.parse(html[0].innerText));
            alert(JSON.stringify(jsonLayout))
        }
    });
}
