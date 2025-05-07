const fs = require("fs");
const officegen = require('officegen')
const URL = require("node:url");
const XLSX = require('xlsx');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());

app.use(express.json())

var file

app.use(fileUpload());

app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Nenhum arquivo foi carregado.');
    }
    let sampleFile = req.files.file;
    sampleFile.mv(__dirname + '/uploads/' + sampleFile.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        file = loadFile(__dirname + '/uploads/' + sampleFile.name)

        let columns = new Set()
        for (const [key, value] of Object.entries(file)) {
            for (const [k, v] of Object.entries(value)) {
                columns.add(k)
            }
        }
        let jsonExcel = {}
        jsonExcel.columns = Array.from(columns)
        jsonExcel.records = file

        res.send(jsonExcel);

    });

});

app.post('/export', function (req, res) {
    if (!req.body.fileName) {
        return res.send('Nenhum nome de arquivo para ser salvo foi informado.');
    }
    Array.from(req.body.commands).forEach(record => {
        analyserCommand(record)
    })
    res.send(`Arquivo gerado com sucesso!`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

function analyserCommand(command) {
    const searchTerm = "campo:";
    const indexOfFirst = paragraph.indexOf(searchTerm);

    if (indexOfFirst != -1){
        let split = command.subString(indexOfFirst, command.length + 1)
        let firstSharpIndex = split.indexOf('#')
        let campoCommand = split.subString(firstSharpIndex, command.length + 1)
        console.log(campoCommand) 
    }

}

const key_field = 'Linguagem da Apresentação'

function loadFile(file) {
    var workbook = XLSX.readFile(file);
    var sheet_name_list = workbook.SheetNames;
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

}
function filterNegativeTable(obj, arr) {
    var filtered_table = []
    for (const [key, value] of Object.entries(obj)) {
        for (const [k, v] of Object.entries(value)) {
            if (String(k).startsWith(key_field)) {
                let filteredArray = arr.filter(e => !v.startsWith(e))
                if (filteredArray.length == arr.length) {
                    console.log(`[Filtering negative values] :  ${v}`)
                    filtered_table.push(value)
                }

            }
        }
    }
    return filtered_table
}

function filterTable(obj, param, isNegative) {
    var filtered_table = []
    for (const [key, value] of Object.entries(obj)) {
        for (const [k, v] of Object.entries(value)) {
            if (String(k).startsWith(key_field)) {
                if (String(v).startsWith(param)) {
                    console.log(`[Filtering positive values] :  ${v}`)
                    filtered_table.push(value)
                }
            }
        }
    }
    return filtered_table
}

function isUrlValid(userInput) {
    if (String(userInput).includes(',') || String(userInput).includes(' ') || String(userInput).startsWith('@')) {
        return false
    } else {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null) {
            return false;
        } else {

            return true;
        }
    }

}

function buildDocx(name, filtered_table) {
    let docx = officegen('docx')

    for (const [key, value] of Object.entries(filtered_table)) {
        let count = 1
        let app = docx.createP({ align: 'center' })
        app.addText(`${Number(key) + 1} - ${Object.entries(value)[18][0]}`, { bold: true, font_size: 14, font_face: 'Arial', color: '151516' })
        let header = docx.createP({ align: 'center' })
        header.addText(`${Object.entries(value)[18][1]}`, { bold: true, font_size: 14, font_face: 'Arial', color: '151516' })

        for (const [k, v] of Object.entries(value)) {
            if (String(k).startsWith('Nome Completo do Responsável') || String(k).startsWith('Nome Social ou Artístico ( se houve)') ||
                String(k).startsWith('Contato WhatsApp') || String(k).startsWith('Cidade e Estado') ||
                String(k).startsWith('Mini Bio') || String(k).startsWith('Gênero') ||
                String(k).startsWith('Raça, cor ou etnia') || String(k).startsWith('Raça, cor ou etnia') ||
                String(k).startsWith('Você é um Pessoa com deficiência? ') || String(k).startsWith('Área de atuação') ||
                String(k).startsWith('Número de Integrantes') || String(k).startsWith('Sinopse da Apresentação') ||
                String(k).startsWith('Faixa Etária (público alvo)') || String(k).startsWith('Tempo de Duração da Apresentação')) {

                var boldText = docx.createP();
                boldText.addText(`${count++} - ${k} :`, { bold: true, font_size: 11, font_face: 'Arial', color: '151516' })

                var text = docx.createP();
                text.addText(`${v}`, { font_size: 10, font_face: 'Arial', color: '151516' })
            } else if (
                String(k).startsWith('Redes Sociais da(o) Atração ou Proponente (link)') || String(k).startsWith('Portfólio da Atração (apresentação)') ||
                String(k).startsWith('Foto da Atração para Divulgação') || String(k).startsWith('Repertório (caso se aplique)') ||
                String(k).startsWith('Rider Técnico (obrigatório para apresentação em palco)') || String(k).startsWith('Vídeo, Áudio ou foto da Atração (link liberado)')) {
                var boldText = docx.createP();
                boldText.addText(`${count++} - ${k} :`, { bold: true, font_size: 11, font_face: 'Arial', color: '151516' })
                let link = String(v).trim()

                var text = docx.createP();
                if (isUrlValid(link)) {
                    text.addText(`${v}`, { font_size: 10, font_face: 'Arial', color: '0000EE', link: URL.parse(link), underline: true })

                } else {
                    text.addText(`${v}`, { font_size: 10, font_face: 'Arial', color: '151516' })
                }

            }
        }
        docx.createP()
        count = 1
    }
    const output = fs.createWriteStream(`${String(name).trim().toLocaleLowerCase()}.docx`);
    docx.generate(output);

}
function buildOutput(arr, isNegative) {
    if (isNegative === true) {
        arr.forEach(v => {
            buildDocx(v, filterTable(loadFile(), v))
        })
    } else {
        buildDocx("negative", filterNegativeTable(loadFile(), arr))
    }

}