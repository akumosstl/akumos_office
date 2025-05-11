function formatterFormulasQuestions() {
    if (formulas_question_init) return
    let table = document.getElementById('tableFormula')

    document.getElementById('allFormulas').addEventListener('change', (e) => {
        var table = document.getElementById('tableFormula')
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
    formulas_question_init = true

}
function applyFormulaFormatter() {
    var table = document.getElementById('tableFormula')
    Array.from(table.rows).forEach(row => {
        let checkboxRow = row.cells[0].getElementsByTagName('input')
        if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
            if (checkboxRow[0].checked == true) {
                var fieldName = checkboxRow[0].closest('tr').cells[1].innerText
                if (fieldName === 'Campos') return
                let schemaFiltered = this.schema.filter(ss => ss.campo === fieldName)
                let s = schemaFiltered[0]

                s.valor.comeca_com = document.getElementById('inputStartWith').value
                s.valor.e_ou = document.getElementById('inputAndOur').value
                s.valor.contenha = document.getElementById('inputContains').value

                row.cells[2].innerText = JSON.stringify(s.valor)

            }
        }

    });

}
