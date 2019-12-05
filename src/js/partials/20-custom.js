


$(document).ready(function() {

  // preloading page script
  
  $(window).on('load', function(){
    $('.loading').animate({top: '40%', opacity: '0'});
    $('#preloader').fadeOut();
  });

  // button to top page script

  var progressPath = document.querySelector('.progress-btnToTop path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
    }
    
    updateProgress();
    
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 1500;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-btnToTop').addClass('active-progress');
			} else {
				jQuery('.progress-btnToTop').removeClass('active-progress');
			}
		});
		jQuery('.progress-btnToTop').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
    
    // menu toggle bars button script
    
    var $header = $('header');

    $('.togglebutton').click( function() {
        $(this).toggleClass('active');
        $header.toggleClass('active');
    });

    // scroll event for navbar header

    var zero = 0;

    $(window).scroll(function() {
        $header.toggleClass('hide', $(window).scrollTop() > zero);
        zero = $(window).scrollTop();

        if ($(window).scrollTop() > 0) {
          $header.addClass('scrolled');
        } else {
          $header.removeClass('scrolled');
        }
    });

  // scroll down button script

    $('.scroll-btn').click(function(){
      $('body, html').animate({
        scrollTop: $('section.services').offset().top}, 1500);
    });

  //  dynamic margin for element footer

    if ($(window).width() >= 1201) { 
      $('body').css('marginBottom', $('footer#footer').innerHeight());
    }else {
      $('body').css('marginBottom', '0');
      }

  // popup free quote script

    $('a#freeQuote').click(function(e){
      e.preventDefault();
      $('.modal-quote').fadeIn(500);
    });

    $('.modal-quote span.close').click(function(){
      $('.modal-quote').fadeOut(500);
    });
    
    $('.modal-quote').click(function(){
        $(this).fadeOut(500);
    });

    $('.modal-quote .popup-content').click(function(event){
      event.stopPropagation();
    });
    
    $(document).keydown(function(e){
      if (e.keyCode == 27) {
        $('.modal-quote').fadeOut(500);
      }
    });

  // slick slider init
  
    $('.slider-for').slick({
      autoplay: true,
      speed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: '.slider-nav',
      prevArrow: '.services-section .controllers .PrevArrow',
			nextArrow: '.services-section .controllers .NextArrow'
    });
    $('.slider-nav').slick({
      autoplay: false,
      speed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      arrows: false,
      dots: false,
      focusOnSelect: true
    });

  });

  // nice scroll init

  // $("html").niceScroll({
  //   scrollspeed: 50,
  // });

//  init aos animation library
  AOS.init();

  //  init snake hover img library
  $(".snake").snakeify({
  speed: 200
  });

  // float placholder of inputs
  
  function stateCheck($formControl) {
    if ($formControl.val().length > 0) {
      $formControl.addClass('valid')
    }else {
      $formControl.removeClass('valid')
    }
  }
  $(function () {
    $('.form-control').on('focusout', function(){
      stateCheck($(this));
    })
  })