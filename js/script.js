// Establece la fecha y hora de finalización de la cuenta atrás (por ejemplo, 1 de enero de 2025)
const fechaFinal = new Date('Apr 27, 2024 15:30:00').getTime()

// Actualiza la cuenta atrás cada segundo
const x = setInterval(() => {
  // Obtiene la fecha y hora actuales
  const ahora = Date.now()

  // Encuentra la distancia entre ahora y la fecha de finalización
  const distancia = fechaFinal - ahora

  // Cálculos de tiempo para días, horas, minutos y segundos
  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24))
  const horas = Math.floor(
    (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60))
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000)

  // Muestra el resultado en el elemento con id="countdown"
  document.getElementById(
    'countdown'
  ).innerHTML = `<span class='numero'>${dias}</span> days <span class='numero'>${horas}</span> hours <span class='numero'>${minutos}</span> minutes<span class='numero'> ${segundos}</span> seconds` // Si la cuenta atrás termina, escribe algún texto
  if (distancia < 0) {
    clearInterval(x)
    document.getElementById('countdown').innerHTML = 'EXPIRADO'
  }
}, 1000)

// Obtener elementos del DOM
const modal = document.getElementById('myModal')
const openModalBtn = document.getElementById('openModalBtn')
const closeModalBtn = document.getElementsByClassName('close')[0]

// Función para abrir el modal
function openModal() {
  modal.style.display = 'block' // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
  modal.style.display = 'none' // Ocultar el modal
}

// Event listener para abrir el modal
openModalBtn.addEventListener('click', openModal)

// Event listener para cerrar el modal al hacer clic en la "x"
closeModalBtn.addEventListener('click', closeModal)

// Event listener para cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', function (event) {
  if (event.target == modal) {
    closeModal()
  }
})
