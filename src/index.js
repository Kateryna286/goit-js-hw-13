import './css/styles.css';
//import '../node_modules/simplelightbox/src/simple-lightbox';
import '../node_modules/simplelightbox/src/simple-lightbox.scss';
import {SimpleLightbox} from 'simplelightbox';
//import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import axios from 'axios';
import { Notify } from 'notiflix';
//import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
//import SimpleLightbox from "simplelightbox";
import imageCardTpl from './templates/imgcard.hbs';


const refs = {
    imageGallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    btnSubmit: document.querySelector('button[type=submit]'),
    btnLoadMore: document.querySelector('button[type=button]'),
};

//var lightbox = new SimpleLightbox('.gallery a');
axios.defaults.baseURL = 'https://pixabay.com/api';
const OPTIONS = '&image_type=photo&orientation=horizontal&safesearch=true';
const APIKEY = '22564694-3177f5daba1f2572eee652a36';

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const keyWord = form.elements.searchQuery.value.trim();
    clearMarkup();
    if (keyWord !== "") {
        fetchImagesByKeyWord(keyWord)
            .then(images => {
                if (images.length === 0) {
                    Notify.failure(
                        'Sorry, there are no images matching your search query. Please try again.',
                        {
                            timeout: 2000,
                        });
                }

                renderImagesCardsMarkup(images);
                //lightbox.refresh();
                
                

            })
            .catch(error => console.log(error));
    };
};

async function fetchImagesByKeyWord(keyWord) {
    const response = await axios.get(`/?key=${APIKEY}&q=${keyWord}${OPTIONS}`);
    return response.data.hits;
};

function createImagesCardsMarkup(images) {
    return images.map(imageCardTpl).join('');
};

function renderImagesCardsMarkup(images) {
    const markup = createImagesCardsMarkup(images);   
    refs.imageGallery.innerHTML = markup;
};

function clearMarkup() {
    refs.imageGallery.innerHTML = "";
};


//console.log(createImagesCardsMarkup(images));

// async function addAndRenderBook() {
//   try {
//     const book = await addBook({});
//     console.log(book);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function fetchImagesByKeyWord(keyWord) {
//   try {
//     const response = await axios.get(`/?key=${APIKEY}&q=${keyWord}${OPTIONS}`);
//     return response.data.hits;
//   } catch (error) {
//     console.error(error);
//   }
// };

// var lightbox = new SimpleLightbox('.gallery a');

// fetchImages(images => {
//   renderImages(images);
//   lightbox.refresh();
// });

// 1 - fetch картинки
// 2 - рисуем
// 3 - рефреш либы