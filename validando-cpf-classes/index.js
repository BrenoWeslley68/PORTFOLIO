// expressão regular para tirar tudo que não for um número: replace(/\D+/g, '')
// 705.484.450-52 / 070.987.720-03

class ResultadoCPF {
    constructor(valor) {
        this.cpf = valor
    }
    Corrige() {
        let cpfLimpo = this.cpf.replace(/\D+/g, "")
        if (cpfLimpo.length !== 11) throw new Error('CPF inválido')
        let teste = cpfLimpo
        cpfLimpo = Array.from(cpfLimpo)
        cpfLimpo.splice(-2, 2)
        let resultado = converteNumero(cpfLimpo)
        cpfLimpo = VerificaDigito(cpfLimpo)
        cpfLimpo = somaCPF(cpfLimpo)
        cpfLimpo = resto(cpfLimpo)
        resultado.push(cpfLimpo)
        cpfLimpo = resultado
        cpfLimpo = VerificaDigito(cpfLimpo)
        cpfLimpo = somaCPF(cpfLimpo)
        cpfLimpo = resto(cpfLimpo)
        resultado.push(cpfLimpo)
        resultado = resultado.join('')
        if (teste[9] !== resultado[9] || teste[10] !== resultado[10]) throw new Error('CPF inválido')
        return resultado
    }
}
function converteNumero(valores) {
    let resultado = []
    for (let valor of valores) {
        resultado.push(Number(valor))
    }
    return resultado
}
const resto = (valor) => 11 - (valor % 11)
function VerificaDigito(valores) {
    if (typeof valores !== 'number') {
        let ValoresValidos = []
        let i = valores.length + 1
        for (let Valor of valores) {
            Valor *= i
            i--
            ValoresValidos.push(Valor)
        }
        return ValoresValidos
    } else throw Error('CPF inválido')
}
function somaCPF(CPF) {
    let cpf = CPF
    let CPf;
    cpf.reduce(function (acumulador, valor) {
        acumulador += Number(valor)
        CPf = acumulador
        return CPf
    }, 0)
    return CPf
}
const cpf1 = new ResultadoCPF('705.484.450-52')
console.log(cpf1.Corrige())
console.log(cpf1)