src = "https://cdn.jsdelivr.net/npm/sweetalert2@11"
src = "https://cdn.jsdelivr.net/npm/toastr/build/toastr.min.js"

document.getElementById('loginButton').addEventListener('click', () => {
    Swal.fire({
        title: 'Вход в систему',
        html: `<input type="text" id="username" class="swal2-input" placeholder="Логин">
<input type="password" id="password" class="swal2-input" placeholder="Пароль">`,
        confirmButtonText: 'Авторизация',
        focusConfirm: false,
        preConfirm: () => {
            const username = Swal.getPopup().querySelector('#username').value;
            const password = Swal.getPopup().querySelector('#password').value;

            if (!username || !password) {
                Swal.showValidationMessage('Пожалуйста, введите логин и пароль');
                return;
            }
            return {username, password};
        },
    }).then((result) => {
        if (result.value && result.value.username === 'admin' && result.value.password === '1234') {
            toastr.success('Авторизация прошла успешно!');
            document.getElementById('loginButton').remove();
        } else {
            toastr.error('Ошибка авторизации! Проверьте данные.');
        }
    });
});