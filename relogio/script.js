
function horario(){
    let hora = document.getElementById('hora')
    let now = new Date()
    let horas = now.getHours()
    let minutos = now.getMinutes()
    let segundos = now.getSeconds()

    horas = horas < 10 ? '0'+ horas : horas
    minutos = minutos < 10 ? '0' + minutos : minutos
    segundos = segundos < 10 ? '0' + segundos : segundos
    hora.innerHTML = `${horas}:${minutos}:${segundos}`
    
}
setInterval(horario, 1000)






