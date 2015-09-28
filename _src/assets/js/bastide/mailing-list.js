// Quick 'n dirty™
if (!window.Bastide) window.Bastide = {};
Bastide.mailingList = {
  subscribe: function() {
    var form  = document.querySelector('#mailing-list');
    var email = document.querySelector('#mailing-list [name=email]').value;

    if (!email) {
      if (form.querySelector('.alert-box')) {
        form.querySelector('.alert-box').remove();
      }

      form.insertAdjacentHTML(
        'afterbegin',
        '<div class="alert-box alert text-left">Please enter a valid email address</div>'
      );

      return;
    }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/mailinglist/subscribe');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({ email: email }));

    xhr.onload = function() {
      if (xhr.status !== 200 || !xhr.responseText || xhr.responseText.indexOf('youtube.com') === -1) {
        if (form.querySelector('.alert-box')) {
          form.querySelector('.alert-box').remove();
        }

        form.insertAdjacentHTML(
          'afterbegin',
          '<div class="alert-box alert text-left">The email signup API seems to be down. Shoot us an email or let us know on Facebook.</div>'
        );

        return;
      }

      var btn = form.querySelector('[type=submit]');

      btn.className += 'done';
      btn.disabled   = true;
      btn.innerHTML  = 'Done!';

      setTimeout(function() {
        form.insertAdjacentHTML(
          'afterbegin',
          '<div class="alert-box success text-left">Thanks for signing up!</div>'
        );

        labels = form.querySelectorAll('label');
        fields = form.querySelectorAll('input, textarea, select');

        [].forEach.call(labels, function(label) {
          label.classList.add('disabled');
        });

        [].forEach.call(fields, function(field) {
          field.disabled = true;
        });
      }, 1000);
    };
  }
};
