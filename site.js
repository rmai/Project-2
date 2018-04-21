/* eslint-disable */
/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"))||null:null;}, setItem:function(e, o, n, t, r, c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)){return!1;}var s=""; if(n){switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n; break; case String:s="; expires="+n; break; case Date:s="; expires="+n.toUTCString();}}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""), !0;}, removeItem:function(e, o, n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""), !0):!1;}, hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&")+"\\s*\\=").test(document.cookie);}, keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), o=e.length, n=0; o>n; n++){e[n]=decodeURIComponent(e[n]);}return e;}}; typeof module!=="undefined"&&typeof module.exports!=="undefined"&&(module.exports=docCookies);
/* eslint-enable */
(function($){
  var items= [];
  var toppings= [];
  var pizza_options= [];
  $('html').addClass('js').removeClass('no-js');
  $('#nav').before('<a id="js-nav" class="border-menu" href="#nav"></a>');
  console.log((docCookies.getItem('count')));
  if(docCookies.keys().length === 1) {
    console.log('HERE');
      docCookies.setItem('count', '0',null, '/');
  }
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
    if ($(this).attr('href') === "#sauce-cheese-crust") { // disply chesse,sauce,etc
      $('#sauce-cheese-crust h3 a').addClass('selected');
      $('#pizza-options').addClass('selected');
    } else if (($(this).attr('href') === "#to-toppings") ||
        ($(this).attr('href') === "#toppings-content") ) { // display toppings
      $('#toppings-section h3 a').addClass('selected');
      $('#toppings-content').addClass('selected');
    }
  });

  $('#pizza-customization-page li').on('click', function(e) {
    e.preventDefault();
    console.log(this);
    if ($(this).attr('id') === 'veggie-toppings') {   // Veggie header
      $('#veggie-toppings a[href="#veggies"]').addClass('selected');
      $('#meat-toppings a[href="#meats"]').removeClass('selected');
      $('#meat-toppings').removeClass('selected');
      $('#veggie-toppings').addClass('selected');
    } else if ($(this).attr('id') === 'meat-toppings') { // meat topping header
      $('#meat-toppings a[href="#meats"]').addClass('selected');
      $('#veggie-toppings a[href="#veggies"]').removeClass('selected');
      $('#veggie-toppings').removeClass('selected');
      $('#meat-toppings').addClass('selected');
    } else if ($(this).attr('class') === 'meat-item') { // meat item
      $(this).children('h5').children('a').toggleClass('selected');
      $(this).find('.topping-amount').toggleClass('selected');
      if($('ol.topping-amount.selected li').has('li.selected')){
        $(this).addClass('selected');
      } else {
        $(this).removeClass('selected');
      }
    } else if ($(this).attr('class') === 'veggie-item') { // veggie item
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
    } else if ($(this).is($('.pizza-main-options li'))) { // pizza main option
      $(this).siblings().removeClass('selected');
      $(this).toggleClass('selected');
    } else if ($(this).is($('.pizza-secondary-options li'))) { // pizza secondary options
      $(this).siblings().removeClass('selected');
      $(this).toggleClass('selected');
    } else if ($(this).children('a').attr('href') === '#to-toppings') { // Topping button on chesse, suace page
      console.log('TO TOPPINGS');
      $('#pizza-customization-page h3 a').removeClass('selected');
      $('.options-content').removeClass('selected');
      $('#toppings-section h3 a').addClass('selected');
      $('#toppings-content').addClass('selected');
      $('html,body').scrollTop(0);
    }
    //  $(this).addClass('selected');
  });

  $('.button').on('click', function(e) {
    var pageID= $(this).closest('html').attr('id');
    var cost= parseFloat($(this).parent().siblings('.menu-item-cost').text().substring(1));
    var name= $(this).parent().siblings('.menu-item-header').text();
    var item_count;
    var item;
    // console.log(this);
    // console.log(name);
    // console.log(cost);
    e.preventDefault();
    if(pageID === 'drinks-page' && ($(this).hasClass('order-btn'))) {
      console.log('DRINKS');
      $('#aside').addClass('display');
      setTimeout(
        function() {
          $('#aside').removeClass('display');
     }, 4500);
      item= {
        type: 'Drinks',
        cost: cost,
        name: name
      };
      items.push(item);
      setItem(item);
      getItems();
    } else if (pageID === 'desserts-page' && ($(this).hasClass('order-btn'))) {
      console.log('DESSERTS');
      $('#aside').addClass('display');
      setTimeout(
        function() {
         $('#aside').removeClass('display');
      }, 4500);
      item= {
        type: 'Desserts',
        cost: cost,
        name: name
      };
      items.push(item);
      setItem(item);
      getItems();
    }else if (pageID === 'pasta-page' && ($(this).hasClass('order-btn'))) {
      console.log('PASTA');
      $('#aside').addClass('display');
      setTimeout(
        function() {
         $('#aside').removeClass('display');
      }, 4500);
      item= {
        type: 'Pasta',
        cost: cost,
        name: name
      };
      items.push(item);
      setItem(item);
      getItems();
    }else if ($(this).closest('html').hasClass('sides-page') && ($(this).hasClass('order-btn'))) {
      console.log('SIDES');
      $('#aside').addClass('display');
      setTimeout(
        function() {
         $('#aside').removeClass('display');
      }, 4500);
      item= {
        type: 'Sides',
        cost: cost,
        name: name
      };
      items.push(item);
      setItem(item);
      getItems();
    }else if ($(this).closest('html').hasClass('wings-page') && ($(this).hasClass('order-btn'))) {
      console.log('WINGS');
      $('#aside').addClass('display');
      setTimeout(
        function() {
         $('#aside').removeClass('display');
      }, 4500);
      item= {
        type: 'Wings',
        cost: cost,
        name: name
      };
      items.push(item);
      setItem(item);
      getItems();
       }else if ($(this).closest('html').hasClass('pizza-page') && ($(this).hasClass('order-btn'))) {
         console.log('PIZZA');
         $('#aside').addClass('display');
         setTimeout(
           function() {
            $('#aside').removeClass('display');
         }, 4500);
         item= {
           type: 'Pizza',
           cost: cost,
           name: name
         };
         items.push(item);
         setItem(item);
         getItems();
    }else if ($(this).text() === "Customize") {
      console.log("CUSTOMIZE");
      //window.location.href = 'https://sealteam362.github.io/Project-2/order-now/';
    }else if ($(this).closest('li').attr('id') === "toppings-add-btn") {  // add cart btn
      if($('.topping-amount li:nth-of-type(n+2)').hasClass('selected')) { // Grabbing selected toppings
        item= {
          type: 'Pizza',
          cost: 10.50,
          name: 'Custom Pizza',
          toppings: ''
        };
        console.log(item.cost);
        $('.topping-amount li:nth-of-type(n+2).selected').each(function() {
          var topping= {
            name: '',
            amount: ''
          };
          topping.name = $(this).parent().parent().children('h5').text();
          topping.amount = $(this).children('a').text();
          toppings.push(topping);
        });
        console.log(toppings);
      }
    //  window.location.href = '/food-choices/index.html';
    }else if ($('#pizza-options li').hasClass('selected')) { // Pizaa options
      $('.pizza-main-options li.selected').each(function (){
        var pizza_option= {
          name: '',
          option: '',
          instructions: ''
        };
        pizza_option.name =  $(this).parent().parent().children('h4').text();
        pizza_option.option = $(this).children('a').text();
        pizza_option.instructions = $('textarea').val();
        pizza_options.push(pizza_option);
      });
      console.log(pizza_options);
    }else if ($(this).attr('id') === 'payment-btn') {
      console.log('pay me now');
      //docCookies.removeItem('count');
      docCookies.setItem('count', '0',null,'/');
      removeItems();
    }else if ($(this).attr('id') === 'cart-btn') {
      console.log('cart');
    //  window.location.href = '/checkout';
    window.location.href = '/Project-2/checkout';
    } else {
      //window.location.href = 'https://sealteam362.github.io/Project-2/food-choices/';
    }
    //  if(($('.topping-amount li:nth-of-type(n+2).selected').closest('html h5'))
    function setItem(item) {
      var _item = item.type + ',' + item.name + ',' + item.cost;
      var count = parseFloat(docCookies.getItem('count'));
      if (count === 0) {
        count = 1;
      }
      console.log(_item);
      console.log(count.toString());
      docCookies.setItem(count, _item,null,'/');
      count++;
      docCookies.setItem('count', count,null,'/');
      console.log(count);
    }
    function removeItems() {
      console.log('function');
      var count = parseFloat(docCookies.getItem('count'));
      for(i = 0; i <= count -1; i++) {
        docCookies.removeItem(i);
        console.log(i+'');
      }
    }
  });
  // function getItems() {
  //   var count = parseFloat(docCookies.getItem('count'));
  //   for(i = 1; i <= count -1 ; i++) {
  //     $('#checkout-items ul').append('<li></li>');
  //    console.log(docCookies.getItem(i).split(',')[0] + i);
  //    console.log(docCookies.getItem(i).split(',')[1] + i);
  //    console.log(docCookies.getItem(i).split(',')[2] + i);
  //   }
  // }
  if ($('html').attr('id') === 'checkout-page') {
    var count = parseFloat(docCookies.getItem('count'));
    var htmlString = '';
    var temp =''
    console.log('checkout');
    for(i = 1; i <= count -1 ; i++) {
      temp += '<li class="checkout-item">';
      temp += '<ul>';
      temp += '<li class="checkout-item-type">' + docCookies.getItem(i).split(',')[0];
      temp += '</li>';
      temp += '<li class="checkout-item-name">' + docCookies.getItem(i).split(',')[1];
      temp += '</li>';
      temp += '<li class="checkout-item-cost">' + '$'+docCookies.getItem(i).split(',')[2];
      temp += '</li>';
      temp += '</ul>';
      temp += '</li>';
     console.log(docCookies.getItem(i).split(',')[0]);
     console.log(docCookies.getItem(i).split(',')[1]);
     console.log(docCookies.getItem(i).split(',')[2]);
     htmlString = temp;
    }
    $('#checkout-items ul').append(htmlString);

  }
  function validPayment(form_array) {
    // make sure the following fields are not empty
    var isValid = true;
    var i = 0;

    // form_array[0].regex = /.*/;
    // form_array[1].regex = /^[^\s@]+@[^\s@]+$/;
    // form_array[2].regex = /^\d{5}$/;
    // form_array[3].regex = /^\d{15,16}$/;
    // form_array[4].regex = /^\d{2}\/\d{2}$/;
    // form_array[5].regex = /^\d{3,4}$/;

    for(i = 0; i < form_array.length; i++) {
      if(!form_array[i].regex.test(form_array[i].value)) {
        isValid = false;

      }
    }
    return isValid;
  }
  validPayment(items);

})(jQuery);
// console.log($(this).text());
// console.log($(this).attr('href'));
