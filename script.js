const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'https://www.studioghibli.com.au/wp-content/uploads/2017/07/ghibli_logo_gold.png';

const container = document.createElement('div')

container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('div')
      h1.innerHTML = movie.title
      h1.classList.add('title')

      const p = document.createElement('p')
      movie.description = movie.description.substring(0, 300)
      p.textContent = `${movie.description}...`
      p.classList.add('description')

      const poster = document.createElement('img')
        poster.src = movie.image 
        poster.style.width = "100%"

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(poster)
      card.appendChild(p)

      console.log(movie)
    })
  } else {
    const errorMessage = document('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()