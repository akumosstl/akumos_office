var jsonColumns = ["nome", "sobrenome", "idade", "endereço"]
var shcema = [
    {
        campo: "nome",
        legenda: {
            cor: "#c03535",
            fonte: "Arial",
            tamanho: "20",
            template: ":",
            alinhamento: "center",
            sublinhado: true,
            index: true,
            bold: true,
            italic: true,
        },
        valor: {
            titulo: false,
            cor: "#000000",
            fonte: "Arial",
            tamanho: "16",
            template: "",
            alinhameto: "",
            sublinhado: true,
            index: true,
            link: false,
            bold: true,
            italic: true,
            comeca_com: "a",
            e_ou: "...",
            contenha: "",
            alinhamento: "left",
        },
    }, {
        campo: "endereço",
        legenda: {
            cor: "#c03535",
            fonte: "Arial",
            tamanho: "20",
            template: ":",
            alinhamento: "center",
            sublinhado: true,
            index: true,
            bold: true,
            italic: true,
        },
        valor: {
            titulo: false,
            cor: "#000000",
            fonte: "Arial",
            tamanho: "12",
            template: "",
            alinhameto: "",
            sublinhado: false,
            index: true,
            link: false,
            bold: false,
            italic: false,
            comeca_com: "r",
            e_ou: "E",
            contenha: "xs",
            alinhamento: "left",
        },
    }]

class HtmlBuilder {
    static create(type, attrs,) {
        let e = document.createElement(type);
        if (attrs != null) {
            attrs.forEach((value, key) => {
                e.setAttribute(key, value)
            });

        }
        return e
    }

    static th(cells) {
        let th = document.createElement('th')
        if (cells != null) {
            cells.forEach(td => {
                th.appendChild(td)
            })
        }
        return th
    }

}

class FormulaQuestion {
    table
    parentId

    constructor(parent_id) {
        this.parentId = parent_id
    }

    card() {
        /* CARD */
        let card = HtmlBuilder.create('div', new Map([
            ['class', 'card mb-4']
        ]))

        let card_header = HtmlBuilder.create('div', new Map([
            ['class', 'card-header']
        ]))

        card_header.appendChild(HtmlBuilder.create('i', new Map([
            ['class', 'fas fa-table me-1']
        ])))

        card_header.appendChild(document.createTextNode('Fórmulas'))

        let span_question_caption = HtmlBuilder.create('span', new Map([
            ['class', 'question-caption']
        ]))
        span_question_caption.innerText = "Q - Defina as fórmulas que deseja utilizar para os valores (conteúdo das colunas). "
            + "Você pode aplicar as fórmulas para mais de uma coluna/valor ao mesmo tempo, para isto "
            + "selecione os campos aos "
            + "quais deseja "
            + "aplicar a formatação."

        card.appendChild(card_header)
        card.appendChild(span_question_caption)
        return card
    }

    form() {
        /* BODY: FORM */
        let card_body = HtmlBuilder.create('span', new Map([
            ['class', 'card-body']
        ]))
        let row_1 = HtmlBuilder.create('div', new Map([
            ['class', 'row']
        ]))
        let row_1_col_1 = HtmlBuilder.create('div', new Map([
            ['class', 'col']
        ]))

        let label_for_startWith = HtmlBuilder.create('div', new Map([
            ['class', 'form-label']
        ]))
        label_for_startWith.innerText = 'Começa com'

        let input_startWith = HtmlBuilder.create('input', new Map([
            ['class', 'form-control']
        ]))

        row_1_col_1.appendChild(label_for_startWith)
        row_1_col_1.appendChild(input_startWith)
        row_1.appendChild(row_1_col_1)
        let row_1_col_2 = HtmlBuilder.create('div', new Map([
            ['class', 'col']
        ]))

        let label_for_condition = HtmlBuilder.create('div', new Map([
            ['class', 'form-label']
        ]))
        label_for_condition.innerText = 'Condição'

        let input_condition = HtmlBuilder.create('input', new Map([
            ['class', 'form-control']
        ]))

        row_1_col_2.appendChild(label_for_condition)
        row_1_col_2.appendChild(input_condition)

        row_1.appendChild(row_1_col_2)

        let row_1_col_3 = HtmlBuilder.create('div', new Map([
            ['class', 'col']
        ]))

        let label_for_contains = HtmlBuilder.create('div', new Map([
            ['class', 'form-label']
        ]))
        label_for_contains.innerText = 'Contém'
        let input_contains = HtmlBuilder.create('input', new Map([
            ['class', 'form-control']
        ]))

        row_1_col_3.appendChild(label_for_contains)
        row_1_col_3.appendChild(input_contains)
        row_1.appendChild(row_1_col_3)

        card_body.appendChild(row_1)
        return card_body

    }

    btable() {
        /*  TABLE */
        this.table = HtmlBuilder.create('table', new Map([
            ['id', 'table_formula'],
            ['class', 'table']
        ]))
        this.table.appendChild(HtmlBuilder.th(
            [
                HtmlBuilder.create('td', new Map([[
                    'width', '1%'
                ]])),
                HtmlBuilder.create('td', new Map([[
                    'width', '20%'
                ]])),
                HtmlBuilder.create('td', new Map([[
                    'width', '79%'
                ]]))
            ]
        ))
        let checkbox_all = HtmlBuilder.create('input', new Map([
            ['type', 'checkbox'],
            ['id', 'arquivo_question_all']
        ]))
        checkbox_all.checked = false
        checkbox_all.addEventListener('change', (e) => {
            Array.from(this.table.rows).forEach(row => {
                let checkboxRow = row.cells[0].getElementsByTagName('input')
                if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
                    if (e.currentTarget.checked) {
                        let fieldName = row.cells[1].innerText
                        if (fieldName != 'Todos') {
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
        let th = this.table.getElementsByTagName('th')[0]
        th.getElementsByTagName('td')[0].appendChild(checkbox_all)
        th.getElementsByTagName('td')[1].innerText = 'Todos'

        Array.from(jsonColumns).forEach(f => {
            var tr = this.table.insertRow(-1)

            var columnCheck = tr.insertCell(-1)
            columnCheck.setAttribute('width', '1%')

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = false
            columnCheck.appendChild(checkbox);

            var columnFieldName = tr.insertCell(-1)
            columnFieldName.setAttribute('width', '20%')
            columnFieldName.innerHTML = f

            var columnCode = tr.insertCell(-1)
            columnCode.setAttribute('width', '79%')
            columnCode.innerText = ''

        })
        return this.table
    }

    build() {
        let card = this.card()
        let card_body = this.form()

        let div_btn_html = HtmlBuilder.create('div', new Map([
            ['class', 'row']
        ]))
        div_btn_html.innerHTML = `
        <div class="row">
            <div class="col">
                <br>
                <a href="#" class="btn btn-secondary" onclick="FormulaQuestion.applyFormulaFormatter()">Aplicar
                    Fórmula</a>
            </div>
        </div><br>
        `

        card_body.appendChild(div_btn_html)
        card_body.appendChild(this.btable())

        let div_footer = HtmlBuilder.create('div')
        div_footer.innerHTML = `
        <div>
            <a href="#" class="btn btn-primary" onclick="next('Valores')">Voltar</a>
            &nbsp;&nbsp;
            <a href="#" class="btn btn-primary" onclick="next('Exportar')">Próximo</a>
        </div>
        `
        card_body.appendChild(div_footer)
        card.appendChild(card_body)

        document.getElementById(this.parentId).appendChild(card)
    }

    static applyFormulaFormatter() {
        var table = document.getElementById('table_formula')
        Array.from(table.rows).forEach(row => {
            let checkboxRow = row.cells[0].getElementsByTagName('input')
            if (checkboxRow.length > 0 && checkboxRow[0].type == 'checkbox') {
                if (checkboxRow[0].checked == true) {
                    var fieldName = checkboxRow[0].closest('tr').cells[1].innerText
                    if (fieldName === 'Todos') return
                    let schemaFiltered = shcema.filter(ss => ss.campo === fieldName)
                    let s = schemaFiltered[0]
                    if (s != undefined) {
                        s.valor.comeca_com = document.getElementById('inputStartWith').value
                        s.valor.e_ou = document.getElementById('inputAndOur').value
                        s.valor.contenha = document.getElementById('inputContains').value

                        row.cells[2].innerText = JSON.stringify(s.valor)
                    }

                }
            }

        });

    }

}
new FormulaQuestion('formulas_x').build()//'formulas_question_test')