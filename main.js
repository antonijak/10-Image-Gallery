let pictureContainer = document.querySelector('#displayed-picture');
let main = document.querySelector('main');

function displayPicture() {
  photosInfo.forEach((element, index) => {
    if (element.src !== '') {
      let picture = document.createElement('img');
      let fullName = document.createElement('div');
      let pictureContainer = document.createElement('div');
      main.appendChild(pictureContainer);
      pictureContainer.appendChild(picture);
      pictureContainer.appendChild(fullName);
      pictureContainer.className = 'picture-container';
      picture.className = 'picture';
      fullName.id = 'full-name';
      picture.setAttribute('src', './images/' + element.src);
      picture.setAttribute('alt', element.alt)
      fullName.textContent = element.firstName + ' ' + element.lastName;

      pictureContainer.addEventListener('click', () => displayModal(index));
    }
  })
}

function displayModal(i) {
  let modal = document.createElement('div');
  let details = document.createElement('div');
  let noPic = document.createElement('div');
  let nextButton = document.createElement('button');
  let backButton = document.createElement('button');
  let bigPicture = document.createElement('img');
  let name = document.createElement('div');
  let iterator = 0;
  let titles = ['', '', 'Title: ', 'Nationality: ', '', '', 'Skills: ', 'Why software development: ', 'Long term vision:', 'What motivates me: ', 'Favorite quote: ', 'Joined on: '];

  document.body.appendChild(modal);
  modal.appendChild(details);
  details.appendChild(name);
  details.appendChild(bigPicture)
  details.appendChild(noPic)
  details.appendChild(backButton);
  details.appendChild(nextButton);
  name.className = 'detail';
  nextButton.className = 'button';
  backButton.className = 'button';
  modal.id = 'modal';
  modal.className = 'a';
  details.id = 'details';
  bigPicture.id = 'big-picture';
  name.id = 'fullName';
  noPic.id = 'just-text';
  name.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName;
  backButton.innerHTML = '<ion-icon name="arrow-back"></ion-icon> Back'
  nextButton.innerHTML = 'Next <ion-icon name="arrow-forward"></ion-icon>';

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
        title.id = 'titles';

        if (key == 'skills') {
          content.textContent = photosInfo[i][key].join(', ');
        } else if (key == 'src') {
          bigPicture.setAttribute('src', './images/' + photosInfo[i][key]);
          bigPicture.setAttribute('alt', photosInfo[i][key])
          noPic.removeChild(div)
        } else {
          content.textContent = photosInfo[i][key];
        }

        
        modal.style.display = 'block'
       
      }
    }
    iterator++
  }
  modal.addEventListener('click', () => modal.style.display = 'none')
  nextButton.addEventListener('click', () => nextM(i));
  backButton.addEventListener('click', () => backM(i));
}

function nextM(i) {
  if (i == photosInfo.length - 1) {
    displayModal(0)
  } else {
    i++
    while (photosInfo[i].src == '') {
      i++
    }
    displayModal(i)
  }
}

function backM(i) {
  if (i == 0) {
    i = photosInfo.length - 1
    displayModal(i)
  } else {
    i--
    while (photosInfo[i].src == '') {
      i--
    }
    displayModal(i)
  }
}

displayPicture();