class ResultadoCPF {
    constructor(valor) {
        this.cpf = valor
    }
    Corrige() {
        let cpfLimpo = this.cpf.replace(/\D+/g, "")
        if (cpfLimpo.length !== 11) {
            alert('erro, CPF inválido')
            return null
        }
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
        if (teste[9] !== resultado[9] || teste[10] !== resultado[10]) return alert('CPF inválido')
        return resultado
    }
}
class Pessoa extends ResultadoCPF {
    constructor() {
        super()
        this.nome = document.querySelector('#inome')
        this.sobrenome = document.querySelector('#isobrenome')
        this.cpf = document.querySelector('#icpf')
        this.usuario = document.querySelector('#iusuario')
        this.senha = document.querySelector('#isenha')
        this.botao = document.querySelector('#cadastra')
        this.linhaUsuario = document.querySelector('#us')
        this.usuarioCaracteres = document.querySelector('#usCaracteres')
        this.linhaSenha = document.querySelector('#password')
        this.linhaCPF = document.querySelector('#linhacpf')
        this.emBranco = document.querySelector('#nenhum')
    }
    clicouEnter(botao, botao2) {
        botao.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                return botao2.focus()
            }
        })
    }
    verificaCampos() {
        let evitaSimbolos = /^[a-zA-Z0-9 ]+$/;
        let temMaiusculas = /[A-Z]/
        let temMinuscuals = /[a-z]/
        let mudaCor = (elemento, cor1, cor2, tempo1, tempo2, callback) => {
            setTimeout(() => {
                elemento.style.color = cor1
                callback(elemento, cor2, tempo2)
            }, tempo1)
        }
        let mudaCorPreto = (elemento, cor, tempo) => {
            setTimeout(() => {
                elemento.style.color = cor
            }, tempo)
        }
        this.clicouEnter(this.nome, this.sobrenome)
        this.clicouEnter(this.sobrenome, this.cpf)
        this.clicouEnter(this.cpf, this.usuario)
        this.clicouEnter(this.usuario, this.senha)
        this.clicouEnter(this.senha, this.botao)
        this.botao.addEventListener('click', () => {
            

            if (typeof(this.nome.value) !== 'string'|| !this.nome.value.trim()) {
                return alert(`Erro, o campo nome precisa ser preenchido corretamente`)
            }
            if (!this.sobrenome.value.trim() || typeof (this.sobrenome.value) !== 'string') {
                return alert('Erro, o campo sobrenome precisa ser preenchido corretamente')
            }
            let cpfCorrigido = new ResultadoCPF(this.cpf.value).Corrige()
            if (!cpfCorrigido) {
                mudaCor(this.linhaCPF, 'red', 'black', 0, 1500, mudaCorPreto)
                return
            }
            if (!evitaSimbolos.test(this.usuario.value)) {
                mudaCor(this.linhaUsuario, 'red', 'black', 1000, 1000, mudaCorPreto)
                return alert('Erro, Usuário precisa ser preenchido corretamente')
            }

            if (this.usuario.value.length > 12 || this.usuario.value.length < 3) {
                mudaCor(this.usuarioCaracteres, 'red', 'black', 0, 1500, mudaCorPreto)
                return
            }

            if (this.senha.value.length > 12 || this.senha.value.length < 6 || evitaSimbolos.test(this.senha.value) || !temMaiusculas.test(this.senha.value) || !temMinuscuals.test(this.senha.value)) {
                mudaCor(this.usuarioCaracteres, 'red', 'black', 0, 1500, mudaCorPreto)
                return alert('Erro, faltando caracteres para senha')
            }




            return alert('Parabéns, cadastro realizado com sucesso!')
        })

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
    } else return alert('CPF inválido')
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
const pessoa = new Pessoa()
pessoa.verificaCampos()