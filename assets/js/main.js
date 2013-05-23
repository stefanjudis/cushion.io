!function(document) {
  function navigationClickHandler() {
    var i = 0,
        id = this.href.split('#')[1],
        sections = document.querySelectorAll('section'),
        readme;


    if (id) {
      for(i; i < sections.length; i++){
        if (sections[i].classList.contains('active')) {
          sections[i].classList.remove('active');
        }
      }

      readme = document.getElementById(id);
      readme.classList.add('active')
    }
  };

  var navigationLinks = document.querySelectorAll('nav a');

  for (var i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener(
      'click',
      navigationClickHandler,
      false
    );
  }
}(document);
