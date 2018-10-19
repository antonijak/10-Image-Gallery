let pictureContainer = document.querySelector('#displayed-picture');
let main = document.querySelector('main');
let nationalitiesSet = new Set()
let nationNumber = document.querySelector('#nation');
let nationsContainer = document.querySelector('#nationalities');

function displayPicture(array) {

  array.forEach((element, index) => {
    if (element.src !== '') {
      let picture = document.createElement('img');
      let fullName = document.createElement('div');
      let pictureContainer = document.createElement('div');

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
        if (typeof element.nationality=== "object") {
          nationalitiesSet.add(element.nationality[0])
          nationalitiesSet.add(element.nationality[1])
        } else {
          nationalitiesSet.add(element.nationality)
        }
        
      }
      pictureContainer.addEventListener('click', () => displayModal(index));
    }
  })
  nationNumber.textContent = nationalitiesSet.size;
}

function displayModal(i) {
  console.log(i);
  
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
  nextButton.addEventListener('click', () => showNextPersonModal(i));
  backButton.addEventListener('click', () => showBackPersonModal(i));
}

function showNextPersonModal(i) {
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

function showBackPersonModal(i) {
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

function easeIn(element) {
  setTimeout(() => {
    element.classList.toggle('active')
  }, 100)
}

function createNationalityButton() {
  let nationalitiesArray = [];

  nationalitiesSet.forEach(ntnl => nationalitiesArray.push(ntnl))
  nationalitiesArray.sort((a, b) => a.localeCompare(b))
  nationalitiesArray.push('-Show All-')
  nationalitiesArray.forEach((ntnl) => {
    let button = document.createElement('button');

    button.className = 'nationButton';
    button.id = ntnl;
    button.textContent = ntnl;
    nationsContainer.appendChild(button)
    button.addEventListener('click', () => showSelected(button))
  })
  let showAll = document.getElementById('-Show All-')
  showAll.addEventListener('click', () => displayPicture(photosInfo));
  showAll.style.backgroundColor = 'gray';
  

}

function showSelected(button) {
  main.innerHTML = '';
  let selectedPeople = [];
  for (object of photosInfo){
    console.log(object);
    
    if (object.src){
      if (button.textContent == object.nationality || button.textContent == object.nationality[0] || button.textContent == object.nationality[1]) {
        selectedPeople.push(object)
    } else {
      selectedPeople.push({src: ''})
    }
  } else {
      selectedPeople.push({src: ''})
    }
   
  } 
  console.log(selectedPeople);
  displayPicture(selectedPeople)
}

displayPicture(photosInfo);
createNationalityButton()