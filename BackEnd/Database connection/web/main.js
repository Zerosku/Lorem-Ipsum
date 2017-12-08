"use strict"

// DOM elements
const hamMenu = document.querySelector('.fa-bars');
const sidebar = document.querySelector('.sidebar');
const file = document.querySelectorAll('.file');
const folder = document.querySelectorAll('.folder');
const lightbox = document.querySelector('.lightbox');
const user_name = document.querySelector('.username');
const uploadFile = document.querySelector('#file');
const uploadLabel = document.querySelector('.upload-span');

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

// function that gets cookie from client by cookie name

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

// checks user authentication by cookie value
const cookie = () => {

  let checkAuth = getCookie("auth");

  if (checkAuth !== null) {
    let username = getCookie("auth");
    user_name.innerHTML = 'Hello ' + username;
  } else {
      alert("Session expired, please re-login");
      window.location.replace("index.html");
  }
};

document.onload = cookie();

// sets cookie value to null and redirects to login site
const logout = () => {
    let checkAuth = getCookie("auth");
    checkAuth = null;
}


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
    if (click.className.includes('fa-info-circle')) { // the info button of file/folder

      click.className = 'fa fa-2x fa-times-circle';

      // here we construct the dropdown menu from components above
      dropDiv.appendChild(downloadLink);
      dropDiv.appendChild(favLink);
      dropDiv.appendChild(deleteLink);
      click.appendChild(dropDiv);
    } else if (click.className.includes('fa-times-circle')) { // the x button of file/folder
      click.className = 'fa fa-2x fa-info-circle';
      dropDiv.remove();
    } else if (click.className.includes('upload-button')) { // the upload button
      lightbox.classList.toggle('hidden'); // lightbox toggle
    } else if (click.className.includes('upload-x')) { // x button of upload lightbox
      lightbox.classList.toggle('hidden'); // lightbox toggle
    }
});

const changeUploadText = () => {
  if (uploadFile && uploadFile.value) {
    uploadLabel.innerHTML = 'File fetched';
  } else {
    uploadLabel.innerHTML = 'Select a file'

  }
}
