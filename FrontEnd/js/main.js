"use strict"

// DOM elements
const hamMenu = document.querySelector('.fa-bars');
const sidebar = document.querySelector('.sidebar');
const file = document.querySelectorAll('.file');
const folder = document.querySelectorAll('.folder');
const lightbox = document.querySelector('.lightbox');

// create new DOM elements
const dropDiv = document.createElement('div'); // container div element
dropDiv.className = 'dropdown';

const downloadLink = document.createElement('a'); // download button
const downloadText = document.createTextNode('Download');
downloadLink.appendChild(downloadText);
downloadLink.className = 'smallButton';

const favLink = document.createElement('a'); // favorite button
const favText = document.createTextNode('Favourite');
favLink.appendChild(favText);
favLink.className = 'smallButton';

const deleteLink = document.createElement('a'); // delete button
const deleteText = document.createTextNode('Delete');
deleteLink.appendChild(deleteText);
deleteLink.className = 'smallButton';

// click listener for hamburger menu button
hamMenu.addEventListener('click', (evt) => {

  sidebar.classList.toggle('slideInLeft');
  sidebar.classList.toggle('hidden');
});

// click listener for various things
document.addEventListener('click', (evt) => {
    let click = evt.target; // target that is clicked

    // checks if you clicked on a info bubble
    // and creates a little dropdown menu
    // and also changes the icon to correspond the right one
    if (click.className.includes('fa-info-circle')) { // the info button

      click.className = 'fa fa-2x fa-times-circle';

      // here we construct the dropdown menu from components above
      dropDiv.appendChild(downloadLink);
      dropDiv.appendChild(favLink);
      dropDiv.appendChild(deleteLink);
      click.appendChild(dropDiv);
    } else if (click.className.includes('fa-times-circle')) { // the x button

      click.className = 'fa fa-2x fa-info-circle';
      dropDiv.remove();
    } else if (click.className.includes('upload')) {
      lightbox.classList.toggle('hidden'); // lightbox toggle
    }
});
