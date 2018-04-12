/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

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
  $('#pizza-customization-page h3 a').on('click', function(e) {
    e.preventDefault();
    $('#pizza-customization-page h3 a').removeClass('selected');
    $('.options-content').removeClass('selected');
    if ($(this).attr('href') === "#sauce-cheese-crust") { //disply chesse,sauce,etc
        $('#sauce-cheese-crust h3 a').addClass('selected');
        $('#pizza-options').addClass('selected');
        console.log(this);
    } else if ($(this).attr('href') === "#toppings-content") { //display toppings
        $('#toppings-section h3 a').addClass('selected');
        $('#toppings-content').addClass('selected');
      }
  });

  $('#pizza-customization-page li').on('click', function(e) {
    e.preventDefault();
    console.log($(this));
    if ($(this).attr('id') === 'veggie-toppings') {   //Veggie header
      $('#veggie-toppings a[href="#veggies"]').addClass('selected');
      $('#meat-toppings a[href="#meats"]').removeClass('selected');
      $('#meat-toppings').removeClass('selected');
      $('#veggie-toppings').addClass('selected');
    } else if ($(this).attr('id') === 'meat-toppings') { //meat topping header
        $('#meat-toppings a[href="#meats"]').addClass('selected');
        $('#veggie-toppings a[href="#veggies"]').removeClass('selected');
        $('#veggie-toppings').removeClass('selected');
        $('#meat-toppings').addClass('selected');
    } else if ($(this).attr('class') === 'meat-item') { //meat item
        $(this).children('h5').children('a').toggleClass('selected');
        $(this).find('.topping-amount').toggleClass('selected');
        if($('ol.topping-amount.selected li').has('li.selected')){
          $(this).addClass('selected');
        } else {
            $(this).removeClass('selected');
        }
    } else if ($(this).attr('class') === 'veggie-item') { //veggie item
        $(this).children('h5').children('a').toggleClass('selected');
        $(this).find('.topping-amount').toggleClass('selected');
        if($('ol.topping-amount.selected li').has('li.selected')){
          $(this).addClass('selected');
        } else {
            $(this).removeClass('selected');
        }
    } else if (($(this).is('ol.topping-amount.selected li'))) { // topping amount
        $(this).siblings().removeClass('selected');
        $(this).toggleClass('selected');
    } else if ($(this).is($('.pizza-main-options li'))) { //pizza main option
      console.log('here');
      $(this).siblings().removeClass('selected');
      $(this).toggleClass('selected');
    } else if ($(this).is($('.pizza-secondary-options li'))) { //pizza secondary options
      console.log('here');
      $(this).siblings().removeClass('selected');
      $(this).toggleClass('selected');
    }
    //  $(this).addClass('selected');
  });

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

  // console.log($(this).text());
  // console.log($(this).attr('href'));
