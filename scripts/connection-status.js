const connectionStatus = document.getElementById('connection-status');

function showTemporaryMessage(message, displayTime = 3000) {
    connectionStatus.textContent = message;
    connectionStatus.style.display = 'block';

    setTimeout(() => {
        connectionStatus.style.display = 'none';
    }, displayTime);
}

window.addEventListener('online', () => {
    connectionStatus.classList.remove('offline');
    connectionStatus.classList.add('online');
    showTemporaryMessage('Соединение восстановлено', 3000);
});

window.addEventListener('offline', () => {
    connectionStatus.classList.remove('online');
    connectionStatus.classList.add('offline');
    showTemporaryMessage('Соединение потеряно', 3000);
});