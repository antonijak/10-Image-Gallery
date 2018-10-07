let pictureContainer = document.querySelector('#displayed-picture');
let main = document.querySelector('main');

function displayPicture() {
  for (i = 0; i < photosInfo.length; i++) {
    //pictureContainer.appendChild(picture);

    if (photosInfo[i].src) {
      let picture = document.createElement('img');
      let modal = document.createElement('div');
      let details = document.createElement('div');
      let noPic = document.createElement('div');
      let next = document.createElement('button');
      let bigPicture = document.createElement('img');
      let name = document.createElement('div');
      let fullName = document.createElement('div');
      let pictureContainer = document.createElement('div');
      let pictureStyle = document.createElement('div');
      document.body.appendChild(modal);
      main.appendChild(pictureContainer);
      pictureContainer.appendChild(picture);
      pictureContainer.appendChild(fullName);
      pictureContainer.className = 'picture-container';
      fullName.id = 'full-name'
      modal.appendChild(details);
      fullName.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName
      close.id = 'close';
      next.id = 'next';
      picture.setAttribute('src', './images/' + photosInfo[i].src);
      picture.setAttribute('alt', photosInfo[i].alt)
      picture.id = i;
      picture.className = 'picture';
      modal.id = 'modal';
      details.id = 'details'
      bigPicture.id = 'big-picture'

      details.appendChild(name);
      details.appendChild(bigPicture)
      details.appendChild(noPic)
      name.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName;
      name.className = 'detail';
      name.id = 'fullName';
      noPic.id = 'just-text'
      let titles = ['', '', 'Title: ', 'Nationality: ', '', '', 'Skills: ', 'Why software development: ', 'Long term vision:', 'What motivates me: ', 'Favorite quote: ', 'Joined on: '];
      let iterator = 0;
      for (let key in photosInfo[i]) {

        if (photosInfo[i][key] && photosInfo[i][key] !== ['']) {
          if (key !== 'firstName' && key !== 'lastName' && key !== 'alt') {

            let div = document.createElement('div');
            noPic.appendChild(div);
            div.id = key;
            div.className = 'detail';
            let title = document.createElement('span');
            let content = document.createElement('span');
            div.appendChild(title);
            div.appendChild(content);
            title.textContent = titles[iterator];
            title.id = 'titles'
            if (key == 'skills') {

              content.textContent = photosInfo[i][key].join(', ');
            } else if (key == 'src') {
              bigPicture.setAttribute('src', './images/' + photosInfo[i][key]);
              bigPicture.setAttribute('alt', photosInfo[i][key])
            } else {
              content.textContent = photosInfo[i][key];
            }
          }

        }

        pictureContainer.addEventListener('click', function () {
          modal.style.top = '2px'
          modal.style.display = 'block'
        })

        modal.addEventListener('click', function () {
          modal.style.display = 'none'
        })

        iterator++
      }
      details.appendChild(next);
    }
  }
}
displayPicture();