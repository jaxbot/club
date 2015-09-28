document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.nav-menu__button').addEventListener('click', function(e) {
    document.querySelector('.nav-menu').classList.toggle('active');

    if (document.querySelector('.nav-menu').classList.contains('active')) {
      document.querySelector('.nav-menu__button').setAttribute('aria-expanded', 'true');
      document.querySelector('.nav-menu ul').setAttribute('aria-hidden', 'false');
    } else {
      document.querySelector('.nav-menu__button').setAttribute('aria-expanded', 'false');
      document.querySelector('.nav-menu ul').setAttribute('aria-hidden', 'true');
    }
  }, false);

  document.querySelector('.nav-menu a').addEventListener('click', function(e) {
    document.querySelector('.nav-menu').classList.remove('active');
  }, false);

  document.querySelector('#mailing-list').addEventListener('submit', function(e) {
      e.preventDefault();
      Bastide.mailingList.subscribe();
  }, false)
}, false );
