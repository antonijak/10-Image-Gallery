let pictureContainer = document.querySelector('#displayed-picture');
let main = document.querySelector('main');
let nationalities = new Set()

function displayPicture(array) {

  array.forEach((element, index) => {
    if (element.src !== '') {
      let picture = document.createElement('img');
      let fullName = document.createElement('div');
      let pictureContainer = document.createElement('div');
      let nation = document.querySelector('#nation');

      main.appendChild(pictureContainer);
      pictureContainer.appendChild(picture);
      pictureContainer.appendChild(fullName);
      pictureContainer.className = 'picture-container';
      pictureContainer.id = index;
      picture.className = 'picture';
      fullName.className = 'full-name';
      picture.setAttribute('src', './images/' + element.src);
      picture.setAttribute('alt', element.alt)
      fullName.textContent = element.firstName + ' ' + element.lastName;
      if (element.nationality) {
        nationalities.add(element.nationality);
        let numOfNation = nationalities.size;
        nation.textContent = numOfNation;
      }

      pictureContainer.addEventListener('click', () => displayModal(index));
    }
  })
}

function displayModal(i) {
  let modal = document.createElement('div');
  let detailsContainer = document.createElement('div');
  let modalName = document.createElement('div');
  let modalPicture = document.createElement('img');
  let modalText = document.createElement('div');
  let nextButton = document.createElement('button');
  let backButton = document.createElement('button');
  let iterator = 0;
  let titles = ['', '', 'Title: ', 'Nationality: ', '', '', 'Skills: ', 'Why software development: ', 'Long term vision:', 'What motivates me: ', 'Favorite quote: ', 'Joined on: '];

  document.body.appendChild(modal);
  modal.appendChild(detailsContainer);
  detailsContainer.appendChild(modalName);
  detailsContainer.appendChild(modalPicture);
  detailsContainer.appendChild(modalText);
  detailsContainer.appendChild(backButton);
  detailsContainer.appendChild(nextButton);

  modal.className = 'modal';
  easeIn(modal)
  easeIn(detailsContainer)
  detailsContainer.className = 'details-container';
  modalName.className = 'modal-name';
  modalPicture.className = 'modal-picture';
  modalText.className = 'modal-text';
  backButton.className = 'navigationButton';
  nextButton.className = 'navigationButton';

  modalName.textContent = photosInfo[i].firstName + ' ' + photosInfo[i].lastName;
  backButton.innerHTML = '<ion-icon name="arrow-back"></ion-icon> <span>Back</span>'
  nextButton.innerHTML = '<span>Next</span> <ion-icon name="arrow-forward"></ion-icon>';

  for (let key in photosInfo[i]) {

    if (photosInfo[i][key] && photosInfo[i][key] !== ['']) {

      if (key !== 'firstName' && key !== 'lastName' && key !== 'alt') {

        let detail = document.createElement('div');
        let detailTitle = document.createElement('span');
        let detailContent = document.createElement('span');

        modalText.appendChild(detail);
        detail.appendChild(detailTitle);
        detail.appendChild(detailContent);
        detail.className = key;
        detail.className += ' detail';
        detailTitle.className = 'titles';
        detailContent.className = 'content';
        detailTitle.textContent = titles[iterator];

        if (key == 'skills') {
          detailContent.textContent = photosInfo[i][key].join(', ');
        } else if (key == 'src') {
          modalPicture.setAttribute('src', './images/' + photosInfo[i][key]);
          modalPicture.setAttribute('alt', photosInfo[i][key])
          modalText.removeChild(detail);
        } else {
          detailContent.textContent = photosInfo[i][key];
        }
      }
    }
    iterator++
  }
  modal.addEventListener('click', () => modal.style.display = 'none');
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

displayPicture(photosInfo);

let easeIn = (element) => {
  setTimeout(() => {
    element.classList.toggle('active')
  }, 100)
}
let selectedPeople = [];

function sortPeople() {
  selectedPeople = [];
  let nationDiv = document.querySelector('#nationalities');

  let nat = [];
  nationalities.forEach(n => {
    if (typeof n === "object") {
      nat.push(n[0])
      nat.push(n[1])
    } else {
      nat.push(n)
    }
  })

  nat.sort((a, b) => a.localeCompare(b))
  let x = new Set;

  nat.forEach(n => x.add(n))

  x.forEach(n => {
    let button = document.createElement('button');
    button.id = 'nationid';
    button.textContent = n;
    nationDiv.appendChild(button)
  })

  let buttons = document.querySelectorAll('#nationid');
  if(selectedPeople.length > 0) {
    selectedPeople.pop();
}
  photosInfo.forEach((el, index) => {
    document.querySelectorAll('.picture-container').forEach(el => el.style.border = 'none')
    let id2 = index.toString();
    
    buttons.forEach(b => b.addEventListener('click', () => addBorder(b, el)))
  })
}

sortPeople();

function addBorder(button, object) {
  console.log('clicked');
  
  main.innerHTML = '';
  if (object.src && button.textContent == object.nationality || button.textContent == object.nationality[0] || button.textContent == object.nationality[1]) {
    selectedPeople.push(object)
  }
  console.log(selectedPeople);

  displayPicture(selectedPeople)
  button.removeEventListener('click', () => addBorder(button, object));
  button.addEventListener('click', () => removeBorder(button, object));
}

function removeBorder(button, object) {
  
  main.innerHTML = '';
  selectedPeople = [];
  displayPicture(photosInfo);
  button.removeEventListener('click', () => removeBorder(button, object));
  button.addEventListener('click',() => addBorder(button, object));
}