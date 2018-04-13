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
    } else if (($(this).attr('href') === "#to-toppings") ||
        ($(this).attr('href') === "#toppings-content") ) { //display toppings
        $('#toppings-section h3 a').addClass('selected');
        $('#toppings-content').addClass('selected');
      }
  });

  $('#pizza-customization-page li').on('click', function(e) {
    e.preventDefault();
    console.log(this);
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
      $(this).siblings().removeClass('selected');
      $(this).toggleClass('selected');
    } else if ($(this).is($('.pizza-secondary-options li'))) { //pizza secondary options
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

  $('.button').on('click' , function(e) {
    var items= [];
    var toppings= [];
    var pizza_options= [];
    var pageID= $(this).closest('html').attr('id');
    var pageClass= $(this).closest('html').attr('class');
    var cost= $(this).attr('value');
    var name= $(this).attr('name');
    var count = docCookies.keys().length-1;
    var item_count = 0;
    e.preventDefault();
    if(pageID === 'drinks-page') {
      console.log('DRINKS');
      var item= {
        type: 'Drinks',
        cost: cost,
        name: name
      };
      items.push(item);
    } else if (pageID === 'desserts-page') {
      console.log('DESSERTS');
      var item= {
        type: 'Desserts',
        cost: cost,
        name: name
      };
      items.push(item);
    }else if (pageID === 'pasta-page') {
      console.log('PASTA');
      var item= {
        type: 'Pasta',
        cost: cost,
        name: name
      };
      items.push(item);
    }else if ($(this).closest('html').hasClass('sides-page')) {
      console.log('SIDES');
      var item= {
        type: 'Sides',
        cost: cost,
        name: name
      };
      items.push(item);
    }else if ($(this).closest('html').hasClass('wings-page')) {
      console.log('WINGS');
      var item= {
        type: 'Wings',
        cost: cost,
        name: name
      };
      items.push(item);
    }else if ($(this).closest('html').hasClass('pizza-page')) {
      console.log('PIZZA');
      var item= {
        type: 'Pizza',
        cost: cost,
        name: name
      };
      items.push(item);
      setItem(item);
      getItem(count);
    }else if ($(this).text() === "Customize") {
      console.log("CUSTOMIZE");
      window.location.href = '/order-now/index.html';
    }else if ($(this).closest('li').attr('id') === "toppings-add-btn") {  //add cart btn
      if($('.topping-amount li:nth-of-type(n+2)').hasClass('selected')) { //Grabbing selected toppings
        var item= {
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
      } else if ($('#pizza-options li').hasClass('selected')) { //Pizaa options
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
      }
      //  if(($('.topping-amount li:nth-of-type(n+2).selected').closest('html h5')))
      //window.location.href = '/food'-choices/index.html';
  }
  function setItem(item) {
    var _item = item.type + ',' + item.name + ',' + item.cost;
    console.log(count);
    item_count++;
    count++;
    console.log(count.toString());
    docCookies.setItem(count.toString(),_item);
    console.log(_item);
  }
  function getItem(count) {
    for(var i = 0; i <= count; i++) {
      console.log(count);
      var _count = count;
      _count++;
    }
    console.log(docCookies.getItem(_count.toString()));
  }
  function removeItem(count) {
    for(var i = 0; i < count; i++) {
      var _count = count;
      console.log(docCookies.removeItem(_count.toString()));
      _count++;
    }
  }


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
          logEvent("Empty or wrong " + form_array[i].name);
        }
      }
      return isValid;
    };
    
  })(jQuery);

  // console.log($(this).text());
  // console.log($(this).attr('href'));
