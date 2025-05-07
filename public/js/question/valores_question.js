function formatterValuesQuestions() {
    if (valores_question_init) return
    let table = document.getElementById('tableValues')

    document.getElementById('allValues').addEventListener('change', (e) => {
        var table = document.getElementById('tableValues')
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
    valores_question_init = true
}
function applyValoresFormatter() {
    var table = document.getElementById('tableValues')
    Array.from(table.rows).forEach(row => {
        let checkboxRow = row.cells[0].getElementsByTagName('input')
        if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
            if (checkboxRow[0].checked == true) {
                var fieldName = checkboxRow[0].closest('tr').cells[1].innerText
                if (fieldName === 'Todos') return
                let schemaFiltered = this.schema.filter(ss => ss.campo === fieldName)
                let s = schemaFiltered[0]
                let inputSelectFont = document.getElementById("inputSelectFont")
                var inputSelectFontText = inputSelectFont.options[inputSelectFont.selectedIndex].text;

                let inputSelectAlignment = document.getElementById("inputSelectAlignment")
                var inputSelectAligmentValue = inputSelectAlignment.value


                s.valor.cor = document.getElementById('inputColorValue').value
                s.valor.fonte = inputSelectFontText
                s.valor.tamanho = document.getElementById('inputSizeValue').value
                s.valor.template = document.getElementById('inputTemplateValue').value
                s.valor.alinhamento = inputSelectAligmentValue
                s.valor.bold = document.getElementById('inputBoldValue').checked == true ? true : false
                s.valor.italic = document.getElementById('inputItalicValue').checked == true ? true : false
                s.valor.link = document.getElementById('inputLinkValue').checked == true ? true : false
                s.valor.sublinhado = document.getElementById('inputSublimatedValue').checked == true ? true : false
                s.valor.index = document.getElementById('inputIndexValue').checked == true ? true : false


                row.cells[2].innerText = JSON.stringify(s.valor)


            }
        }

    });

}
