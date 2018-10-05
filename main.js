let pictureContainer = document.querySelector('#displayed-picture');
let main = document.querySelector('main');

function displayPicture() {
  for (i = 0; i < photosInfo.length; i++) {
    //pictureContainer.appendChild(picture);

    if (photosInfo[i].src !== '') {
      let picture = document.createElement('img');
      let modal = document.createElement('div');
      let details = document.createElement('div');

      main.appendChild(picture);
      document.body.appendChild(modal);
      modal.appendChild(details);
      picture.setAttribute('src', './images/' + photosInfo[i].src);
      picture.setAttribute('alt', photosInfo[i].alt)
      picture.id = i;
      modal.id = 'modal';
      details.id = 'details'
      let name = document.createElement('div');
      details.appendChild(name);
      name.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName;
      name.className = 'detail';
      name.id = 'fullName';

      let titles = ['Title: ', 'Nationality: ', 'Skills: ', 'Why software development: ', 'Long term vision:', 'What motivates me: ', 'Favorite quote: ', 'Joined on: '];
      let iterator = 0;
      for (let key in photosInfo[i]) {
        if ( key !== 'firstName'  && key !== 'lastName' && key !== 'src' && key !== 'alt' ) {
          
         
            let div = document.createElement('div');
            details.appendChild(div);
            div.id = key;
            div.className = 'detail';
            let title = document.createElement('span');
            let content = document.createElement('span');
            div.appendChild(title);
            div.appendChild(content);
            
             if (photosInfo[i][key] !== '') {
              title.textContent = '';
            }  
             
            if (titles[iterator] !== '') {
              title.textContent = titles[iterator]
            } 

            title.id = 'titles';
            if (key == 'skills'){
              content.textContent = photosInfo[i][key].join(', ');
            } else {
              content.textContent = photosInfo[i][key];
            }
            content.id = 'content';
            
            iterator++
        }
      }

      picture.addEventListener('click', function () {
        modal.style.top = '2px'
        modal.style.display = 'block'
      })

      modal.addEventListener('click', function () {
        modal.style.display = 'none'
      })


    }
  }
}

displayPicture()