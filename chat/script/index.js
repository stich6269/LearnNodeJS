(function () {
    document.addEventListener('DOMContentLoaded', function () {

        function sendMessage(e) {
            var xhr = new XMLHttpRequest(),
                message = document.getElementById('text_input').value;
            
            xhr.open('POST', 'http://127.0.0.1:3000/publish', true);
            xhr.send(JSON.stringify(message));
        }

        function subscribe() {
            var xhr = new XMLHttpRequest(),
                ul = document.getElementsByClassName('message-list')[0],
                li = document.createElement('LI');

            xhr.open('GET', 'http://127.0.0.1:3000/subscribe', true);
            xhr.onload = function () {
                li.innerHTML = this.responseText;
                ul.appendChild(li);
                subscribe();
            };

            xhr.send('');
        }

        var form = document.getElementById('send_button');
        form.addEventListener('click', sendMessage);
        subscribe();
    })
})();
