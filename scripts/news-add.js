document.addEventListener('DOMContentLoaded', function() {
    const addNewsButton = document.getElementById('add-news-button');
    const addNewsForm = document.getElementById('add-news-form');
    const titleInput = document.getElementById('news-title');
    const imageInput = document.getElementById('news-image');
    const categorySelect = document.getElementById('news-category');
    const articlesSection = document.getElementById('articles-section');


    function displayNewsItem(title, imageData, dateString, category) {
        const newArticle = document.createElement('article');
        newArticle.classList.add('article-card');

        const newImage = document.createElement('img');
        newImage.classList.add('article-card__image');
        newImage.src = imageData;
        newImage.alt = title;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('article-card__content');

        const newTitle = document.createElement('h3');
        newTitle.classList.add('article-card__title');
        newTitle.textContent = title;

        const newDate = document.createElement('p');
        newDate.classList.add('article-card__date');
        newDate.textContent = dateString;

        const newCategory = document.createElement('p');
        newCategory.classList.add('article-card__category');
        newCategory.textContent = category;

        contentDiv.appendChild(newTitle);
        contentDiv.appendChild(newDate);
        contentDiv.appendChild(newCategory);
        newArticle.appendChild(newImage);
        newArticle.appendChild(contentDiv);


        articlesSection.insertAdjacentElement('afterbegin', newArticle);
    }


    let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];


    savedNews.forEach(newsItem => {
        displayNewsItem(newsItem.title, newsItem.imageData, newsItem.date, newsItem.category);
    });


    addNewsButton.addEventListener('click', function() {
        if (addNewsForm.style.display === 'none' || addNewsForm.style.display === '') {
            addNewsForm.style.display = 'block';
            addNewsButton.textContent = 'Скрыть форму';
        } else {
            addNewsForm.style.display = 'none';
            addNewsButton.textContent = 'Добавить новость';
        }
    });


    addNewsForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const titleValue = titleInput.value.trim();
        const file = imageInput.files[0];
        const categoryValue = categorySelect.value;

        if (!titleValue || !file || !categoryValue) {
            alert('Заполните все поля!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            const today = new Date();
            const dateString = today.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });


            displayNewsItem(titleValue, imageData, dateString, categoryValue);


            const newNewsItem = {
                title: titleValue,
                imageData: imageData,
                date: dateString,
                category: categoryValue
            };
            savedNews.unshift(newNewsItem);
            localStorage.setItem('savedNews', JSON.stringify(savedNews));


            titleInput.value = '';
            imageInput.value = '';
            categorySelect.value = 'Учёба';


            addNewsForm.style.display = 'none';
            addNewsButton.textContent = 'Добавить новость';
        };
        reader.readAsDataURL(file);
    });
});