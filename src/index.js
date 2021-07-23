import './css/styles.css';
//import '../node_modules/simplelightbox/src/simple-lightbox';
import '../node_modules/simplelightbox/src/simple-lightbox.scss';
import SimpleLightbox from "simplelightbox";

import axios from 'axios';
import { Notify } from 'notiflix';
import imageCardTpl from './templates/imgcard.hbs';


const refs = {
    imageGallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    btnSubmit: document.querySelector('button[type=submit]'),
    btnLoadMore: document.querySelector('button[type=button]'),
};

var lightbox = new SimpleLightbox('.gallery a');
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
                console.log(images.hits.length);
                if (images.hits.length === 0) {
                    console.log(images.totalHits.length);
                    Notify.failure(
                        'Sorry, there are no images matching your search query. Please try again.',
                        {
                            timeout: 2000,
                        });
                }

                else {
                    renderImagesCardsMarkup(images);
                        const totalHits = images.totalHits;
                        Notify.info(
                            `Hooray! We found ${totalHits} images.`,
                            {
                                timeout: 2000,
                            });
                    console.log(totalHits);
                    lightbox.refresh();
                };

        

            })
            .catch(error => console.log(error));
    };
};

async function fetchImagesByKeyWord(keyWord) {
    const response = await axios.get(`/?key=${APIKEY}&q=${keyWord}${OPTIONS}`);
    return response.data;
};

function createImagesCardsMarkup(images) {
    return images.hits.map(imageCardTpl).join('');
};

function renderImagesCardsMarkup(images) {
    const markup = createImagesCardsMarkup(images);   
    refs.imageGallery.innerHTML = markup;
};

function clearMarkup() {
    refs.imageGallery.innerHTML = "";
};



// async function addAndRenderBook() {
//   try {
//     const book = await addBook({});
//     console.log(book);
//   } catch (error) {
//     console.log(error);
//   }
// }

