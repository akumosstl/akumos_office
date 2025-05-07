async function callExport(type) {
    console.log(`jsonColumns: ${JSON.stringify(jsonColumns)}, schema: ${JSON.stringify(this.schema)}, records: ${JSON.stringify(jsonRecords)}`)
    if (document.getElementById('inputFileName').value === '') {
        alert("Você precisa fornecer o nome do arquivo (sem a extensão) a ser exportado.")
    } else {
        let url = ''
        if (type === 'word') {
            url = 'http://localhost:3000/export'
        } else if (type === 'json') {
            url = 'http://localhost:3000/download'
        }
        const params = {
            columns: this.jsonColumns,
            schema: this.schema,
            records: this.jsonRecords,
            fileName: document.getElementById('inputFileName').value
        }
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(function (res) { return res.text(); })
            .then(function (text) {
                alert(text)
            })


    }

}