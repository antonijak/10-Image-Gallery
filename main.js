let pictureContainer = document.querySelector('#displayed-picture');
let main = document.querySelector('main');

function displayPicture() {
  for (i = 0; i < photosInfo.length; i++) {

    if (photosInfo[i].src) {

      let picture = document.createElement('img');
      let modal = document.createElement('div');
      let details = document.createElement('div');
      let noPic = document.createElement('div');
      let nextButton = document.createElement('button');
      let bigPicture = document.createElement('img');
      let name = document.createElement('div');
      let fullName = document.createElement('div');
      let pictureContainer = document.createElement('div');
      let titles = ['', '', 'Title: ', 'Nationality: ', '', '', 'Skills: ', 'Why software development: ', 'Long term vision:', 'What motivates me: ', 'Favorite quote: ', 'Joined on: '];
      let iterator = 0;
      document.body.appendChild(modal);
      main.appendChild(pictureContainer);
      pictureContainer.appendChild(picture);
      pictureContainer.appendChild(fullName);
      modal.appendChild(details);
      details.appendChild(name);
      details.appendChild(bigPicture)
      details.appendChild(noPic)
      details.appendChild(nextButton);
      pictureContainer.className = 'picture-container';
      
      picture.className = 'picture';
      name.className = 'detail';
      nextButton.id = i;
      nextButton.className = 'nextButton';
      fullName.id = 'full-name';

      modal.className = 'modal';
      modal.id= i;
      details.id = 'details';
      bigPicture.id = 'big-picture';
      name.id = 'fullName';
      noPic.id = 'just-text';
      picture.setAttribute('src', './images/' + photosInfo[i].src);
      picture.setAttribute('alt', photosInfo[i].alt)
      fullName.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName;
      name.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName;
      nextButton.textContent = 'Next';

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


        nextButton.addEventListener('click', (e) => {
          var buttonId = parseInt(e.target.getAttribute('id')) + 1;
          let buttonIdString  = buttonId.toString();
          var nextParsonModal = document.getElementById(buttonIdString);
          nextParsonModal.style.display = 'block';
        })
        

        iterator++
      }
     
    }
  }
}
displayPicture();

