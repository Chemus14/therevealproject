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
  document.getElementById('countdown').innerHTML = `
  <span class='numero'>
  ${dias}
  </span> 
  d 
  <span class='numero'>
  ${horas}</span>
   h 
   <span class='numero'>
   ${minutos}
   </span> 
   m
   <span class='numero'> 
   ${segundos}
   </span> s` // Si la cuenta atrás termina, escribe algún texto
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
const surveyEl = document.getElementById('survey')
// Manejar el clic en el botón "Boy"
document.getElementById('btn-gender-boy').addEventListener('click', () => {
  votar('Boy')
  surveyEl.style.display = 'none'
})

// Manejar el clic en el botón "Girl"
document.getElementById('btn-gender-girl').addEventListener('click', () => {
  votar('Girl')
  surveyEl.style.display = 'none'
})

// Función para enviar el voto al servidor
function votar(opcion) {
  fetch('http://127.0.0.1:3000/votar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ opcion })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al enviar el voto')
      }
      // Storing data
      localStorage.setItem(`${opcion}`, 'votado')

      obtenerRecuentoVotos()
    })
    .catch((error) => {
      console.error('Error:', error)
      alert('Error al registrar el voto')
    })
}

// Define una función para obtener y mostrar el recuento de votos
function obtenerRecuentoVotos() {
  // Obtener el recuento de votos
  fetch('http://127.0.0.1:3000/votos')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener el recuento de votos')
      }
      return response.json()
    })
    .then((data) => {
      // Por ejemplo, si tienes un elemento con el id "votosCount", puedes actualizar su contenido
      const votesCountElement = document.getElementById('votosCount')
      if (votesCountElement) {
        const totalVotes = data[0].count + data[1].count
        votesCountElement.innerHTML = `<h1>Thanks for voting</h1><progress id="file" max="${totalVotes}" value="${data[0].count}"></progress>`
        // Check if localStorage has something stored for 'Boy' or 'Girl'
        const boyVote = localStorage.getItem('Boy')
        const girlVote = localStorage.getItem('Girl')

        if (boyVote || girlVote) surveyEl.style.display = 'none'
      }
    })
    .catch((error) => {
      console.error('Error al obtener el recuento de votos:', error)
    })
}

// Llamar a la función cuando la página se carga
window.addEventListener('load', obtenerRecuentoVotos)
