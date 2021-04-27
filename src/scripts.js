$(document).ready(function () {

  // ==========================================
  // SMOOTH SCROLL MENU & SCROLLSPY OFFSET FIX
  // ==========================================

  $(document).on('click', 'a[class=nav-link]', function (event) {
    var headerheight = $("#header").outerHeight();
    $("body").attr("data-offset", headerheight);

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        // var targetOffset = $target.offset().top - 128;
        var targetOffset = $target.offset().top - headerheight;
        $('html,body').animate({ scrollTop: targetOffset }, 1000);
        // $("#navbarSupportedContent").removeClass("show");
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
          $(".navbar-toggler").click();
        }
        return false;
      }
    }
  });



  // ====================================
  // CHANGE LINK TEXT WHEN CLICKED (SHOW MORE/SHOW LESS)
  // ====================================

  $("a.more").click(function () {
    var more = $(this).attr("moretext");
    if (typeof more !== typeof undefined && more !== false) {
      // console.log(more); 
      $(this).text(function (i, text) {
        return text === "show less" ? more : "show less";
      })
    }
  });


  // ====================================
  // "WHO" SECTION SLACK REQUEST FORM
  // ====================================

  $(function () {
    // Get the form.
    var form = $('#slackForm');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (event) {
      // Stop the browser from submitting the form.
      event.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass('error');
          $(formMessages).addClass('success');

          // Set the message text.
          $(formMessages).text(response);

          // Clear the form.
          $('#requestEmailAddress').val('');
          $('#voucherHandle').val('');

          // Hide the form
          $(form).hide();
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass('success');
          $(formMessages).addClass('error');

          // Set the message text.
          if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text('Oops! An error occured and your message could not be sent.');
          }
        });
    });
  });


  // ====================================
  // "WHO" SECTION SLIDER INITIALIZER
  // ====================================

  $('.slider-who').slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 2,
    centerMode: false,
    autoplaySpeed: 5000,
    mobileFirst: true,
    prevArrow: "<i class='fa fa-angle-left slick-prev' aria-hidden='true'></i>",
    nextArrow: "<i class='fa fa-angle-right slick-next' aria-hidden='true'></i>"
    ,
    responsive: [
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 3
        }
      }
      ,
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3
        }
      }
      ,
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4
        }
      }
      ,
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 6
        }
      }
    ]
  });


  // =======================================
  // "WHEN" SECTION SLIDER *NAV* INITIALIZER
  // =======================================

  $('.slider-when-nav').slick({
    slidesToShow: 5,
    // slidesToScroll: 1,
    asNavFor: '.slider-when',
    dots: false,
    centerMode: false,
    arrows: false,
    focusOnSelect: true
  });


  // ====================================
  // "WHEN" SECTION SLIDER INITIALIZER
  // ====================================

  $('.slider-when').slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    centerMode: false,
    autoplaySpeed: 5000,
    asNavFor: ".slider-when-nav",
    prevArrow: "<i class='fa fa-angle-left slick-prev' aria-hidden='true'></i>",
    nextArrow: "<i class='fa fa-angle-right slick-next' aria-hidden='true'></i>"
  });

  // ====================================
  // "GRANTS" SECTION SLIDER INITIALIZER
  // ====================================

  var grantsSliderAttrs = {
    dots: false,
    infinite: true,
    centerMode: false,
    autoplaySpeed: 5000,
    slidesToScroll: 3,
    slidesToShow: 3,
    adaptiveHeight: true,
    prevArrow: "<i class='fa fa-angle-left slick-prev' aria-hidden='true'></i>",
    nextArrow: "<i class='fa fa-angle-right slick-next' aria-hidden='true'></i>",
    responsive: [
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ,
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ,
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ,
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  // my slick slider as constant object
  var grantsSlider = $('.slider-grants').on('init', function(slick) {
    console.log('ehllo..')
    // on init run our multi slide adaptive height function
    multiSlideAdaptiveHeight(this);
  }).on('beforeChange', function(slick, currentSlide, nextSlide) {
    // on beforeChange run our multi slide adaptive height function
    multiSlideAdaptiveHeight(this);
  }).slick(grantsSliderAttrs);

  function multiSlideAdaptiveHeight(slider) {
    let activeSlides = [];
    let tallestSlide = 0;

    // very short delay in order for us get the correct active slides
    setTimeout(function() {
      // loop through each active slide for our current slider
      $('.slick-track .slick-active', slider).each(function(item) {
        // add current active slide height to our active slides array
        activeSlides[item] = $(this).outerHeight();
      });

      // for each of the active slides heights
      activeSlides.forEach(function(item) {
        // if current active slide height is greater than tallest slide height
        if (item > tallestSlide) {
          // override tallest slide height to current active slide height
          tallestSlide = item;
        }
      });

      // set the current slider slick list height to current active tallest slide height
      $('.slick-list', slider).height(tallestSlide);
    }, 10);
  }
});

// For FAQ search
function search(){
  // Declare variables
  var input, filter, list, faqs, a, i, txtValue;
  input = document.getElementById('search-input');
  filter = input.value.toUpperCase();
  list = document.getElementById("all-the-faqs");
  faqs = list.getElementsByClassName('question');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < faqs.length; i++) {
    a = faqs[i]

    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      faqs[i].classList.remove('hide')
      // faqs[i].style.display = "";
    } else {
      faqs[i].classList.add('hide')
      // faqs[i].style.display = "none";
    }
  }
}