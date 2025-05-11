const fs = require("fs");
const officegen = require('officegen')
const XLSX = require('xlsx');

var columnsTest = ["nome", "sobrenome", "idade", "endereço"]
var shcemaTest = [
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
var recordsTest = [{ "nome": "alisson ", "sobrenome": "pedrina", "idade": 45, "endereço": "Rua x" }, { "nome": "andre", "sobrenome": "magalhaes", "idade": 43, "endereço": "Rua y" }, { "nome": "maria", "sobrenome": "da silva", "idade": 23, "endereço": "Rua w" }, { "nome": "joana", "sobrenome": "burgues", "idade": 67, "endereço": "Avnedia 8" }]

//processTest('test', shcemaTest, columnsTest, recordsTest)

function processTest(fileName, schema, columns, records) {
    process(fileName, schema, columns, records)
}

function setDocx(docx) {
    docx.on('finalize', function (written) {
        console.log(
            'Finish to create a Microsoft Word document.'
        )
    })
    docx.on('error', function (err) {
        console.log(err)
    })
}

function comecaCom(s, v) {
    if (s == undefined) return true
    if (String(s.valor.comeca_com) != '') {
        if (String(v).toLocaleLowerCase().startsWith(String(s.valor.comeca_com).toLocaleLowerCase())) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

function contenha(s, v) {
    if (s == undefined) return true
    if (String(s.valor.contenha) != '') {
        if (String(v).toLocaleLowerCase().includes(String(s.valor.contenha).toLocaleLowerCase())) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }

}

function process(fileName, schema, columns, records) {
    let docx = officegen('docx')
    setDocx(docx)

    let indexItem = 0
    for (const [k, v] of Object.entries(records)) {
        let indexLabel = 0
        let skipIndex = false
        let skipRecord = false
        let addBreak = false
        for (const [key, value] of Object.entries(v)) {
            let e = schema.filter(s => s.campo == key)[0]
            console.log(`schema: ${schema}`)
            skipRecord = comecaCom(e, value) && contenha(e, value) && columns.includes(key) ? true : false
            if (!skipRecord) break
            if (columns.includes(key)) {
                console.log(`key: ${key} value: ${value}`)
                addBreak = true
                if (!skipIndex) {
                    let pIndex = docx.createP()
                    pIndex.addText(`${++indexItem} - Item`)
                    skipIndex = true
                }
                if (e == undefined) {
                    let pError = docx.createP()
                    pError.addText(`campo: ${key} sem formatação`)
                    pError.addLineBreak()
                } else {
                    indexLabel = indexLabel + 1
                    let pLabel = docx.createP()
                    let text = `${Number(indexLabel)} - ${key}`
                    pLabel.addText(text, {
                        align: e.legenda.alinhamento != '...' ? e.legenda.alinhamento : 'center',
                        bold: e.legenda.negrito,
                        italic: e.legenda.italic,
                        underline: e.legenda.sublinhado,
                        font_face: e.legenda.fonte != '...' ? e.legenda.fonte : 'Arial',
                        font_size: e.legenda.tamanho != '' ? e.legenda.tamanho : 16,
                        color: e.legenda.cor
                    })

                    let pValue = docx.createP()
                    pValue.addText(`${value}`, {
                        align: e.valor.alinhamento != '...' ? e.valor.alinhamento : 'center',
                        bold: e.valor.negrito,
                        italic: e.valor.italic,
                        underline: e.valor.sublinhado,
                        font_face: e.valor.fonte != '...' ? e.valor.fonte : 'Arial',
                        font_size: e.valor.tamanho != '' ? e.valor.tamanho : 16,
                        color: e.valor.cor,
                        link: e.valor.link && isUrlValid(String(value)) ? `${String(value)}` : 'link inválido'
                    })
                }

            }

        }
        if (addBreak) {
            docx.putPageBreak()
            addBreak = false
        }

    }
    const output = fs.createWriteStream(`${fileName}.docx`);
    docx.generate(output);

}

function loadFile(file) {
    var workbook = XLSX.readFile(file);
    var sheet_name_list = workbook.SheetNames;
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

}

function isUrlValid(url) {
    if (String(url).includes(',') || String(url).includes(' ') || String(url).startsWith('@')) {
        return false
    } else {
        var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null) {
            return false;
        } else {

            return true;
        }
    }

}

exports.loadFile = loadFile
exports.process = process


