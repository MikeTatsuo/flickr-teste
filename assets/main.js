$(document).ready(() => {
  getImages();
});

function getImages() {
  $.ajax(getSettings("flickr.photos.getRecent", 6)).done(response => {
    let photos = response.photos.photo;
    photos.forEach(photo => {
      appendCol(photo);
    })
  });
}

function getSettings(method, per_page) {
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/",
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "method": method,
      "format": "json",
      "api_key": "2985e9952038138ba6c4f48626034f86", // Em produção essa chave deve ser armazenada em uma environmental variable
      "per_page": per_page,
      "nojsoncallback": 1
    }
  }
  return settings
}

function appendCol(pho) {
  let col = `<div class="d-flex justify-content-lg-around align-items-center p-3">${appendCard(pho)}</div>`
  $("#images").append(col)
}

function appendCard(ph) {
  let card = `<div class="card bg-dark text-white shadow">
                ${appendImg(ph)}
                <div class="card-img-overlay">
                  <h5 class="card-title">${ph.title}</h5>
                </div>
              </div>`
  return card
}

function appendImg(p) {
  let img = `<img class="card-img" alt="${p.id}" title="${p.title}" src="https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg">`
  return img
}