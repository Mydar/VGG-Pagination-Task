document.getElementById('get-photos').addEventListener('click', displayPhotos);

let main = document.getElementById('main');

let start = 0;
const limit = 10;

function displayPhotos() {
    getOutputs();
    outputPhotos(0, 10);
}

function goToHome() {
    location.reload();
    return false;
}

function checkGallery() {
    start = 0;
    displayPhotos();
}

function getOutputs() {
  document.body.style.backgroundImage = 'none';
  let content = `<div class="jumbotron"><h1 class="gallery">GALLERY</h1></div>
        <div class="container" id="container">
            <div class = "row">
                <div id="photos-container" class="col-sm-12">
                    <div class="loader" id="spinner"></div>
                </div>
            </div>
        </div>
        <div id="bottom-scroll">
            <div class="pagination">
                <button class="nav-buttons btn btn-lg btn-light" id="previous" onClick="previousButton()">Previous</button>
                <button class="nav-buttons btn btn-lg btn-light" id="next" onClick="nextButton()">Next</button>
            </div>
            <div id="page-tag"></div>
        </div>`;

  main.innerHTML = content;
}

function updateElementVisibility(elementId, shouldHide = true) {
    let elementToBeUpdated = document.getElementById(elementId);
    elementToBeUpdated.style.display = shouldHide ? 'none' : 'flex';
    elementToBeUpdated.style.width = shouldHide ? '0px' : '100px';
}

function outputPhotos(start, limit) {
    fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`)
    .then(response => response.json())
    .then(photos => {
        photos.forEach(photo => {
            updateElementVisibility('spinner');
        
            let image = document.createElement('div');
            let caption = document.createElement('div');
            let picture = document.createElement('div');
        
            image.className = 'image-box';
            caption.className = 'figcaption';
            picture.className = 'images';
        
            caption.innerHTML = photo.title;
            picture.innerHTML = `<img src="${photo.url}" alt="jsonplaceholer photo ID:${photo.id}" class="image">`;
        
            image.appendChild(picture);
            image.appendChild(caption);
            console.log(image);
        
            document.getElementById('photos-container').appendChild(image);
        });
    });
    
}

function nextButton() {
    checkArray();
    removeSet();
    start += 10;
    updateElementVisibility('spinner', false);
    outputPhotos(start, limit);
    
}

function previousButton() {
    removeSet()
    start -= 10;
    checkPrevArray();
    updateElementVisibility('spinner', false);
    outputPhotos(start, limit);
}

function removeSet() {
    let div = document.querySelectorAll('.image-box');
    console.log(div);
    console.log(div[0].parentNode);
    for (let i = 0; i < div.length; i++) {
    div[i].parentNode.removeChild(div[i]);
    }

}

function checkArray() {
    let arr = document.querySelectorAll('.image-box');
    console.log(arr);
    console.log(arr.length);
    
    if (arr.length == 0) {
        let endPage = document.createElement('div');
        let film = document.createElement('div');
        let caption = document.createElement('div');

        endPage.className = 'end-div';
        film.className = 'end-image';
        caption.className = 'end-caption';

        caption.innerHTML = `Click Previous To Go Back!`;
        film.innerHTML = `<img src="https://t2conline.com/wp-content/uploads/2017/09/1-1.jpg" alt="Page End Logo" class="image">`;

        endPage.appendChild(film);
        endPage.appendChild(caption);

        document.getElementById('photos-container').appendChild(endPage);
    }
}

function checkPrevArray() {
    if (start < 0) {
        let html = `
        <div class="jumbotron"><h1 class="gallery">GALLERY</h1></div>
        <div id = "prompt-buttons-div">
            <button id = "go-back" class ="prompt-buttons btn btn-lg btn-outline-danger display-4" onclick = "goToHome()">GO TO HOME PAGE</button>
            <button id = "check-gallery" class ="prompt-buttons btn btn-lg btn-outline-danger display-4" onclick = "checkGallery()">BACK TO GALLERY</button>
        </div>
        `
        main.innerHTML = html;
        
    }
}
