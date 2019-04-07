$(document).ready(() => {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.flickr.com/services/rest/",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
            },
        "data": {
          "method": "flickr.photos.getRecent",
          "format": "json",
          "api_key": "2985e9952038138ba6c4f48626034f86", // Em produção essa chave deve ser armazenada em uma environmental variable
          "privacy_key": 1,
          "per_page": 6,
          "nojsoncallback": 1
        }
      }
      
      $.ajax(settings).done((response) => {          
        let photos = response.photos.photo;
        let x = 0;
        photos.forEach((photo, index) => {
            if (!(index % 3)) {
                x++;
                $("#images").append(`<div class="row" id="row${x}"></div>`);
            }
            $(`#row${x}`).append(`<div id="col${index}" class="col-4"><img alt="${photo.id}" title="${photo.title}" src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg"></div>`)
        })
      });
});