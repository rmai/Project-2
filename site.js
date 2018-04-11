(function($){
  $('html').addClass('js').removeClass('no-js');
  $('#nav').before('<a id="js-nav" class="border-menu" href="#nav"></a>');
  $('#js-nav').on('click', function(e) {
    e.preventDefault();
    $('#nav ul').toggleClass('nav-is-visible');
    $('#nav').toggleClass('nav-is-visible');
    $('#header').toggleClass('nav-is-visible');
  });
  $("#slideshow > figure:gt(0)").hide();
  setInterval(function() {
    $('#slideshow > figure:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  }, 3000);


  var validPayment = function(form_array) {
      // make sure the following fields are not empty
      var isValid = true;

      form_array[0].regex = /.*/;
      form_array[1].regex = /^[^\s@]+@[^\s@]+$/;
      form_array[2].regex = /^\d{5}$/;
      form_array[3].regex = /^\d{15,16}$/;
      form_array[4].regex = /^\d{2}\/\d{2}$/;
      form_array[5].regex = /^\d{3,4}$/;
      
      for(var i = 0; i < form_array.length; i++) {
        if(!form_array[i].regex.test(form_array[i].value)) {
          isValid = false;
          logEvent("Invalid " + form_array[i].name);
        }
      }
      return isValid;
    };


  })(jQuery);
