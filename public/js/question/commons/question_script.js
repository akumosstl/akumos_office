function finishQuestion() {
    Array.from(this.fieldsQuestionCampos).forEach(c => {
        let s = JSON.parse(getSchema())
        s['campo'] = c
        this.schema.push(s)
    })

}

function next(value) {
    let arquivo = document.getElementById('arquivo_question')
    let campos = document.getElementById('campos_question')
    let legendas = document.getElementById('legendas_question')
    let valores = document.getElementById('valores_question')
    let formulas = document.getElementById('formulas_question')
    let exportar = document.getElementById('exportar_question')

    switch (value) {
        case 'Arquivo':
            console.log('arquivo...')
            arquivo.style.display = 'inline'
            campos.style.display = 'none'
            legendas.style.display = 'none'
            valores.style.display = 'none'
            formulas.style.display = 'none'
            exportar.style.display = 'none'
            break
        case 'Campos':
            console.log('campos...')
            arquivo.style.display = 'none'
            campos.style.display = 'inline'
            legendas.style.display = 'none'
            valores.style.display = 'none'
            formulas.style.display = 'none'
            exportar.style.display = 'none'
            camposBuild()
            break
        case 'Legendas':
            console.log('legendas...')
            finishQuestion()
            arquivo.style.display = 'none'
            campos.style.display = 'none'
            legendas.style.display = 'inline'
            valores.style.display = 'none'
            formulas.style.display = 'none'
            exportar.style.display = 'none'
            formatterLabelQuestions()
            break
        case 'Valores':
            console.log('valores...')
            arquivo.style.display = 'none'
            campos.style.display = 'none'
            legendas.style.display = 'none'
            valores.style.display = 'inline'
            formulas.style.display = 'none'
            exportar.style.display = 'none'
            formatterValuesQuestions()
            break
        case 'Formulas':
            console.log('formulas...')
            arquivo.style.display = 'none'
            campos.style.display = 'none'
            legendas.style.display = 'none'
            valores.style.display = 'none'
            formulas.style.display = 'inline'
            exportar.style.display = 'none'
            formatterFormulasQuestions()
            break
        case 'Exportar':
            console.log('exportar...')
            arquivo.style.display = 'none'
            campos.style.display = 'none'
            legendas.style.display = 'none'
            valores.style.display = 'none'
            formulas.style.display = 'none'
            exportar.style.display = 'inline'
            break
    }
}