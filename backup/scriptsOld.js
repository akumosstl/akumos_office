const form = document.getElementById("uploadForm");
var jsonColumns = {} //excel file records
var jsonRecords = {}
var uuidCode //tableFields row uuid selected
var selectedField //tableFields row name field selected

window.addEventListener('DOMContentLoaded', event => {
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

function contact(text) {
    let textEncoded = encodeURI(text)
    let href = "https://wa.me/553598559951?text=" + textEncoded
    let a = document.createElement('a')
    a.target = '_blank'
    a.href = href
    a.click();
}

async function uploadFile() {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    await fetch('http://localhost:3000/upload', {
        method: "POST",
        body: formData
    })
        .then(function (res) { return res.json(); })
        .then(function (jsonData) {
            let myTabContent = document.getElementById("myTabContent");
            myTabContent.style['pointer-events'] = 'auto'
            myTabContent.style['opacity'] = '1'

            jsonColumns = jsonData.columns
            jsonRecords = jsonData.records

            buildTableField(jsonColumns)

        })
}

function selectAllRows(e) {
    var table = document.getElementById('tableFields')
    Array.from(table.rows).forEach(row => {
        let checkbox = row.cells[0].getElementsByTagName('input')
        if (checkbox[0].type == 'checkbox') {
            let element = document.getElementById(checkbox[0].id)
            if (element != null) {
                if (e.checked) {
                    element.checked = true
                } else {
                    element.checked = false
                }

            }
        }

    });

}

function buildTableField(jsonData) {
    var table = document.getElementById('tableFields')
    Array.from(jsonData).forEach(i => {
        let uuid = generateUUID()
        var tr = table.insertRow(-1)

        var columnCheck = tr.insertCell(-1)

        var divCode = document.createElement('div')
        divCode.style.display = 'none'
        divCode.id = uuid
        divCode.innerText = '{}'
        columnCheck.appendChild(divCode)

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true
        var rowId = generateUUID()
        checkbox.id = rowId
        columnCheck.appendChild(checkbox);

        var columnName = tr.insertCell(-1)
        columnName.innerHTML = i

        var columnActions = tr.insertCell(-1)

        let btnCode = document.createElement('span')
        btnCode.style.cursor = 'pointer'
        btnCode.innerHTML = '<i class="fa-solid fa-file" style="color: #153A7E"></i>&nbsp;&nbsp;'
        btnCode.setAttribute('data-bs-toggle', 'modal')
        btnCode.setAttribute('data-bs-target', '#staticBackdrop')
        btnCode.addEventListener('click', () => {
            uuidCode = rowId 
            selectedField = i
            console.log(document.getElementById(uuid).innerText)
            //addCodeToForm(document.getElementById(uuid).innerText)

        })
        columnActions.appendChild(btnCode);

        let btnUp = document.createElement('span')
        btnUp.style.cursor = 'pointer'
        btnUp.innerHTML = '<i class="fa-solid fa-arrow-up" style="color: #153A7E"></i>&nbsp;&nbsp;'
        btnUp.addEventListener('click', (e) => {
            var table, row = btnUp.closest('tr');
            while (row != null) {
                if (row.nodeName == 'TR') {
                    break;
                }
                row = row.parentNode;
            }
            table = row.parentNode;
            let previousNode = row.previousSibling
            if (previousNode.nodeName == 'TR') {
                table.insertBefore(row, row.previousSibling);
            }

        })
        columnActions.appendChild(btnUp);

        let btnDown = document.createElement('span')
        btnDown.style.cursor = 'pointer'
        btnDown.innerHTML = '<i class="fa-solid fa-arrow-down" style="color: #153A7E"></i>&nbsp;&nbsp;'
        btnDown.addEventListener('click', () => {
            var table, row = btnDown.closest('tr');
            while (row != null) {
                if (row.nodeName == 'TR') {
                    break;
                }
                row = row.parentNode;
            }
            table = row.parentNode;
            let node = row.nextSibling
            if (node != null) {
                if (node.nodeName == 'TR') {
                    table.insertBefore(row, node.nextSibling);
                }
            }
        })
        columnActions.appendChild(btnDown);

        let btnDelete = document.createElement('span')
        btnDelete.style.cursor = 'pointer'
        btnDelete.innerHTML = '<i class="fa-solid fa-trash" style="color: #153A7E"></i>&nbsp;&nbsp;'
        btnDelete.addEventListener('click', () => {
            if (window.confirm(`Tem certeza que deseja excluir o campo ${selectedField}?`)){
                btnDelete.closest('tr').remove()
            }
        })
        columnActions.appendChild(btnDelete);

    })

}

function apply() {
    var table = document.getElementById('tableFields')
    Array.from(table.rows).forEach(row => {
        let divCode = row.cells[0].getElementsByTagName('div')
        let checkbox = row.cells[0].getElementsByTagName('input')
        if (divCode[0] != undefined) {
            if (checkbox[0].id == uuidCode) {
                divCode[0].innerText = addCodeToRow(checkbox[0].id)
            }
        }
    });
    document.getElementById('modalCloseButton').click()
}

function addCodeToForm(json) {
    if (JSON.stringify(json) === '{}') return

    document.getElementById('inputColor').value = json.label.color
    document.getElementById('inputFont').value = json.lable.font
    document.getElementById('inputSize').value = json.label.size
    document.getElementById('inputAlignment').value = json.label.alignment
    document.getElementById('inputTemplate').value = json.label.template
    if (json.label.break == true) {
        document.getElementById('inputBreak').checked = true
    }
    if (json.label.bold == true) {
        document.getElementById('inputBold').checked = true
    }
    if (json.label.italic == true) {
        document.getElementById('inputItalic').checked = true
    }
    document.getElementById('inputValueColor').value = json.value.color
    document.getElementById('inputValueFont').value = json.value.font
    document.getElementById('inputValueSize').value = json.value.size
    document.getElementById('inputValueAlignment').value = json.value.alignment
    document.getElementById('inputValueTemplate').value = json.value.template
    if (json.value.link == true) {
        document.getElementById('inputValueLink').checked = true
    }
    if (json.label.bold == true) {
        document.getElementById('inputValueBold').checked = true
    }
    if (json.label.italic == true) {
        document.getElementById('inputValueItalic').checked = true
    }
    document.getElementById('inputValueStartWith').value = json.value.startWith
    document.getElementById('inputValueContains').value = json.value.contains
    document.getElementById('inputValueAndOur').value = json.value.andOur


}
function addCodeToRow(uuid) {
    let section = {
        "field": "",
        "uuid": "",
        "label": {
            "color": "",
            "font": "",
            "size": "",
            "template": "",
            "alignment": "",
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
            "alignment": "",
            "link": false,
            "bold": false,
            "italic": false,
            "startWith": "",
            "andOur": "",
            "contains": ""
        }
    }
    section['field'] = selectedField
    section['uuid'] = uuid
    section['label']['color'] = document.getElementById('inputColor').value
    section['label']['font'] = document.getElementById('inputFont').value
    section['label']['size'] = document.getElementById('inputSize').value
    section['label']['alignment'] = document.getElementById('inputAlignment').value
    section['label']['template'] = document.getElementById('inputTemplate').value
    section['label']['break'] = document.getElementById('inputBreak').checked
    section['label']['bold'] = document.getElementById('inputBold').checked
    section['label']['italic'] = document.getElementById('inputItalic').checked

    section['value']['color'] = document.getElementById('inputValueColor').value
    section['value']['font'] = document.getElementById('inputValueFont').value
    section['value']['size'] = document.getElementById('inputValueSize').value
    section['value']['alignment'] = document.getElementById('inputValueAlignment').value
    section['value']['template'] = document.getElementById('inputValueTemplate').value
    section['value']['link'] = document.getElementById('inputValueLink').checked
    section['value']['bold'] = document.getElementById('inputValueBold').checked
    section['value']['italic'] = document.getElementById('inputValueItalic').checked
    section['value']['startWith'] = document.getElementById('inputValueStartWith').value
    section['value']['contains'] = document.getElementById('inputValueContains').value
    section['value']['andOur'] = document.getElementById('inputValueAndOur').value

    return section
}

function callExport(type) {
    var table = document.getElementById('tableLayout')
    Array.from(table.rows).forEach(row => {
        let html = row.cells[1].getElementsByTagName('div')
        if (html[0] != undefined) {
            jsonLayout['document'].push(JSON.parse(html[0].innerText));
            alert(JSON.stringify(jsonLayout))
        }
    });
}

function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}