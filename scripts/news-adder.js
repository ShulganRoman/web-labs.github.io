document.addEventListener('DOMContentLoaded', function() {
    // Получаем секцию со статьями
    const articlesSection = document.querySelector('.articles');

    // Функция для отображения новости на странице
    function displayNewsItem(title, imageData, dateString) {
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
        newCategory.textContent = 'Без категории';

        contentDiv.appendChild(newTitle);
        contentDiv.appendChild(newDate);
        contentDiv.appendChild(newCategory);
        newArticle.appendChild(newImage);
        newArticle.appendChild(contentDiv);

        // Добавляем статью в начало списка статей
        articlesSection.insertAdjacentElement('afterbegin', newArticle);
    }

    // Загружаем сохраненные новости из localStorage
    let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    // Отображаем сохраненные новости
    savedNews.forEach(newsItem => {
        displayNewsItem(newsItem.title, newsItem.imageData, newsItem.date);
    });
});