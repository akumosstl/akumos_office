function formatterLabelQuestions() {
    if (legendas_question_init) return
    let table = document.getElementById('tableLabels')

    document.getElementById('allLabels').addEventListener('change', (e) => {
        var table = document.getElementById('tableLabels')
        this.fieldsQuestionCampos = []
        Array.from(table.rows).forEach(row => {
            let checkboxRow = row.cells[0].getElementsByTagName('input')
            if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
                if (e.currentTarget.checked) {
                    checkboxRow[0].checked = true
                    let fieldName = row.cells[1].innerText
                    if (fieldName != 'Todos' && this.schema.includes(fieldName)) {
                        if (e.currentTarget.checked) {
                            checkboxRow[0].checked = true
                        } else {
                            checkboxRow[0].checked = false
                        }
                    }
                } else {
                    checkboxRow[0].checked = false
                }
            }

        });
    })

    Array.from(jsonColumns).forEach(f => {
        var tr = table.insertRow(-1)

        var columnCheck = tr.insertCell(-1)

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false
        columnCheck.appendChild(checkbox);

        var columnFieldName = tr.insertCell(-1)
        columnFieldName.innerHTML = f

        var columnCode = tr.insertCell(-1)
        columnCode.innerText = ''

    })
    legendas_question_init = true

}


function applyFormatter() {
    var table = document.getElementById('tableLabels')
    Array.from(table.rows).forEach(row => {
        let checkboxRow = row.cells[0].getElementsByTagName('input')
        if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
            if (checkboxRow[0].checked == true) {
                var fieldName = checkboxRow[0].closest('tr').cells[1].innerText
                if (fieldName === 'Campos') return
                let schemaFiltered = this.schema.filter(ss => ss.campo === fieldName)
                let s = schemaFiltered[0]
                let inputSelectFont = document.getElementById("inputSelectFont")
                var inputSelectFontText = inputSelectFont.options[inputSelectFont.selectedIndex].text;

                let inputSelectAlignment = document.getElementById("inputSelectAlignment")
                var inputSelectAligmentValue = inputSelectAlignment.value

                s.legenda.cor = document.getElementById('inputColor').value
                s.legenda.fonte = inputSelectFontText
                s.legenda.tamanho = document.getElementById('inputSize').value
                s.legenda.template = document.getElementById('inputTemplate').value
                s.legenda.alinhamento = inputSelectAligmentValue
                s.legenda.bold = document.getElementById('inputBold').checked == true ? true : false
                s.legenda.italic = document.getElementById('inputItalic').checked == true ? true : false
                s.legenda.sublinhado = document.getElementById('inputSublimated').checked == true ? true : false

                row.cells[2].innerText = JSON.stringify(s.legenda)

            }
        }

    });

}