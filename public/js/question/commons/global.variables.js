var jsonColumns = {}
var jsonRecords = {}
var schema = []
var fieldsQuestionCampos = []

var campos_question_init = false
var legendas_question_init = false
var valores_question_init = false
var formulas_question_init = false

var questions = new Map([[1, 'Arquivo'], [2, 'Campos'], [3, 'Legendas'], [4, 'Valores'], [5, 'Fórmulas'], [6, 'Exportar']])

function getSchema() {
    return `
    {
        "campo": "",
        "legenda": {
            "cor": "",
            "fonte": "",
            "tamanho": "",
            "template": "",
            "alinhamento": "",
            "sublinhado": false,
            "index": false,
            "bold": false,
            "italic": false
        }
        ,
        "valor": {
            "titulo" : false,
            "cor": "",
            "fonte": "",
            "tamanho": "",
            "template": "",
            "alinhameto": "",
            "sublinhado": false,
            "index": false,
            "link": false,
            "bold": false,
            "italic": false,
            "comeca_com": "",
            "e_ou": "",
            "contenha": ""
        }
    }
    `
}