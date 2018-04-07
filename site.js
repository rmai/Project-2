(function($){

  $('html').addClass('js').removeClass('no-js');
  $('#nav').before('<a id="js-nav" class="border-menu" href="#nav"></a>');
  $("#slideshow > figure:gt(0)").hide();

  setInterval(function() {
    $('#slideshow > figure:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  }, 3000);

  })(jQuery);
