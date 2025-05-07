async function uploadFile() {
    let formData = new FormData();
    formData.append("file", document.getElementById('fileupload').files[0]);
    await fetch('http://localhost:3000/upload', {
        method: "POST",
        body: formData
    })
        .then(function (res) { return res.json(); })
        .then(function (jsonData) {
            this.jsonColumns = jsonData.columns
            this.jsonRecords = jsonData.records

            console.log(jsonColumns)
            console.log(jsonRecords)

        })
}
