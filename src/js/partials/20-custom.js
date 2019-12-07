

// TOGGLE HAMBURGER MENU
var $header = $('header.header');
var $hamburger = $header.find('.bars');
var $navbar = $header.find('ul.links')

$hamburger.click(function(e) {
  e.stopPropagation();
  $(this).toggleClass('toggle');
  $navbar.toggleClass('mobile-navbar')
});

$navbar.click(function(e) {
  e.stopPropagation();
})

$(document).click(function() {
  $hamburger.removeClass('toggle');
  $navbar.removeClass('mobile-navbar'); 
})

$(document).keydown(function(e){
  if (e.keyCode == 27) {
    $hamburger.removeClass('toggle');
    $navbar.removeClass('mobile-navbar')
  }
});

// OPEN / CLOSE PAGE FULLSCREEN

$('.toggle-fullscreen').on('click', function() {
  $(this).toggleClass('fullscreen');
  if($(this).hasClass('fullscreen')) {
    openFullscreen()
  }else {
    closeFullscreen()
  }
})

var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
// HOME SLIDER
var $imageSlider = $('.image-slider');
var $textSlider = $('.text-slider');
var slideDuration = 900;

//RESET ANIMATIONS
// On init slide change
$imageSlider.on('init', function(slick){
  TweenMax.to($('.image-slider .slick-track'), 0.9, { marginLeft: 0});
  TweenMax.to($('.image-slider .slick-active'), 0.9, { x: 0,zIndex: 2});
});
// On before slide change
$imageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
  TweenMax.to($('.image-slider .slick-track'), 0.9, {marginLeft: 0});
  TweenMax.to($('.image-slider .slick-active'), 0.9, {x: 0});
  $('.image-slider .slick-list').addClass('do-transition')
});

// On after slide change
$imageSlider.on('afterChange', function(event, slick, currentSlide){
  TweenMax.to($('.image-slider .slick-track'), 0.9, {marginLeft: 0});
  $('.image-slider .slick-slide').css('z-index','1');
  TweenMax.to($('.image-slider .slick-active'), 0.9, {x: 0,zIndex: 2});
  $('.image-slider .slick-list').removeClass('do-transition')
});

//SLICK INIT
$imageSlider.slick({
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: slideDuration,
  dots: true,
  waitForAnimate: true,
  pauseOnHover: false,
  useTransform: true,
  asNavFor: $textSlider,
  cssEase: 'cubic-bezier(0.84, 0, 0.08, 0.99)'
})

$textSlider.slick({
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: slideDuration,
  pauseOnHover: false,
  asNavFor: $imageSlider,
  arrows: false,
  dots: false,
  cssEase: 'cubic-bezier(0.84, 0, 0.08, 0.99)',
})

//PREV
$('.slick-prev').on('mouseenter', function(){
  TweenMax.to($('.image-slider .slick-track'), 1.5, {marginLeft: "180px",ease: Elastic.easeOut});
  TweenMax.to($('.image-slider .slick-current'), 1.5, {x: -100,ease: Elastic.easeOut});
});

$('.slick-prev').on('mouseleave', function(){
  TweenMax.to($('.image-slider .slick-track'), 0.4, {marginLeft: 0,ease: Sine.easeInOut});
  TweenMax.to($('.image-slider .slick-current'), 0.4, {x: 0,ease: Sine.easeInOut});
});

//NEXT
$('.slick-next').on('mouseenter', function(){  
  TweenMax.to($('.image-slider .slick-track'), 1.5, {marginLeft: "-180px",ease: Elastic.easeOut});
  TweenMax.to($('.image-slider .slick-current'), 1.5, {x: 100,ease: Elastic.easeOut});
});

$('.slick-next').on('mouseleave', function(){
  TweenMax.to($('.image-slider .slick-track'), 0.4, {marginLeft: 0,ease: Quad.easeInOut});
  TweenMax.to($('.image-slider .slick-current'), 0.4, {x: 0,ease: Quad.easeInOut});
});

var tl1 = new TimelineMax();
var $formCorner = $('.login-corner');
var $banner = $('section.banner');

tl1.from($banner, 2, {autoAlpha:0, ease:Quad.easeInOut})
    .from($formCorner, .2, {autoAlpha:0, y:200,ease:Power1.easeInOut});

// AOS INIT
AOS.init();

// sponsers slider

$('.sponsers-slider').slick({
  autoplay: true,
  arrows: false,
  dots: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  pauseOnHover: false,
  cssEase: 'cubic-bezier(0.84, 0, 0.08, 0.99)',
  responsive: [
    {
      // breakpoint: 1500,
      // settings: 'unslick'
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
})