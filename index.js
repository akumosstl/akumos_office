const fs = require("fs");
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const office = require('./src/akumos_office')
const { app, BrowserWindow } = require('electron')
const appx = express();

if (true) {
    const createWindow = () => {
        const win = new BrowserWindow({
            width: 1200,
            height: 800,
            autoHideMenuBar: true,
            maximizable: false
        })

        win.loadFile('./public/index.html')
    }

    app.whenReady().then(() => {
        createWindow()
    })

}

appx.use(cors());
appx.use(express.json())
appx.use(fileUpload());
appx.use(express.static(__dirname + '/public'));

var file
var jsonColumns = {}
var jsonRecords = {}

appx.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Nenhum arquivo foi carregado.');
    }
    let sampleFile = req.files.file;
    sampleFile.mv(__dirname + '/uploads/' + sampleFile.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        file = office.loadFile(__dirname + '/uploads/' + sampleFile.name)

        let columns = new Set()
        for (const [key, value] of Object.entries(file)) {
            for (const [k, v] of Object.entries(value)) {
                columns.add(k)
            }
        }
        let jsonExcel = {}
        jsonExcel.columns = Array.from(columns)
        jsonExcel.records = file

        jsonColumns = jsonExcel.columns
        jsonRecords = jsonExcel.records

        res.send(jsonExcel);

    });
});

appx.post('/export', (req, res) => {
    if (!req.body.fileName) {
        return res.send('Nenhum nome de arquivo para ser salvo foi informado.');
    }
    office.process(req.body.fileName, req.body.schema, req.body.columns, JSON.parse(JSON.stringify(req.body.records)))

    res.send(`Arquivo gerado com sucesso!`);
});

appx.post('/download', (req, res) => {
    var json = {}

    json.schema = req.body.schema
    json.columns = req.body.columns
    json.records = req.body.records

    var filename = req.body.fileName

    let file = `${__dirname}\\${filename}.json`

    fs.writeFile(file, JSON.stringify(json), (err) => {
        if (err) {
            console.log(err)
            res.send('Erro ao exportar arquivo JSON')

        } else {
            res.send(`Arquivo exportado em: ${file}`)
        }
    })

})

appx.listen(3000, () => {
    console.log('Server rodando: http://localhost:3000');
});