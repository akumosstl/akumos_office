function camposBuild() {
    if (campos_question_init) return
    document.getElementById('all').addEventListener('change', (e) => {
        let table = document.getElementById('table')
        this.fieldsQuestionCampos = []
        Array.from(table.rows).forEach(row => {
            let checkboxRow = row.cells[0].getElementsByTagName('input')
            if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
                if (e.currentTarget.checked) {
                    checkboxRow[0].checked = true
                    let text = row.cells[1].innerText
                    if (text != 'Campos') {
                        this.fieldsQuestionCampos.push(text)
                    }
                } else {
                    checkboxRow[0].checked = false
                }
            }

        });
    })
    let table = document.getElementById('table')
    Array.from(jsonColumns).forEach(f => {
        var tr = table.insertRow(-1)

        var columnCheck = tr.insertCell(-1)

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false
        checkbox.addEventListener('change', (e) => {
            let tdField = e.currentTarget.closest('tr').cells[1]
            let text = tdField.innerText
            if (e.currentTarget.checked) {
                if (!this.fieldsQuestionCampos.includes(text)) {
                    this.fieldsQuestionCampos.push(text)
                }
            } else {
                if (this.fieldsQuestionCampos.includes(text)) {
                    this.fieldsQuestionCampos.splice(this.fieldsQuestionCampos.indexOf(text), 1)
                }
            }
        })
        columnCheck.appendChild(checkbox);

        var columnCommand = tr.insertCell(-1)
        columnCommand.innerHTML = f

        var columnActions = tr.insertCell(-1)

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
                if (previousNode.cells[1].innerText != 'Todos') {
                    table.insertBefore(row, row.previousSibling);
                }
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
            if (window.confirm(`Tem certeza que deseja excluir?`)) {
                let tr = btnDelete.closest('tr')
                this.fieldsQuestionCampos.splice(this.fieldsQuestionCampos.indexOf(tr.innerText), 1)
                tr.remove()
            }
        })
        columnActions.appendChild(btnDelete);

    })
    campos_question_init = true
}