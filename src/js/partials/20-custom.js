
var $slider = $('.slider');
var $slickTrack = $slider.find($('.slick-track'));
var $slickCurrent = $slider.find($('.slick-current'));
var $slickList = $slider.find($('.slick-list'));
var slideDuration = 900;
// var tlSlider = new TimelineMax()

//RESET ANIMATIONS
// On init slide change
$slider.on('init', function(slick){
  TweenMax.to($('.slick-track'), 0.9, { marginLeft: 0});
  TweenMax.to($('.slick-active'), 0.9, { x: 0,zIndex: 2});
});
// On before slide change
$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
  TweenMax.to($('.slick-track'), 0.9, {marginLeft: 0});
  TweenMax.to($('.slick-active'), 0.9, {x: 0});
  $('.slick-list').addClass('do-transition')
});

// On after slide change
$slider.on('afterChange', function(event, slick, currentSlide){
  TweenMax.to($('.slick-track'), 0.9, {marginLeft: 0});
  $('.slick-slide').css('z-index','1');
  TweenMax.to($('.slick-active'), 0.9, {x: 0,zIndex: 2});
  $('.slick-list').removeClass('do-transition')
});

//SLICK INIT
$slider.slick({
  speed: slideDuration,
  dots: true,
  waitForAnimate: true,
  useTransform: true,
  cssEase: 'cubic-bezier(0.84, 0, 0.08, 0.99)'
})

//PREV
$('.slick-prev').on('mouseenter', function(){
  TweenMax.to($('.slick-track'), 0.6, {marginLeft: "180px",ease: Quad.easeOut});
  TweenMax.to($('.slick-current'), 0.6, {x: -100,ease: Quad.easeOut});
});

$('.slick-prev').on('mouseleave', function(){
  TweenMax.to($('.slick-track'), 0.4, {marginLeft: 0,ease: Sine.easeInOut});
  TweenMax.to($('.slick-current'), 0.4, {x: 0,ease: Sine.easeInOut});
});

//NEXT
$('.slick-next').on('mouseenter', function(){  
  TweenMax.to($('.slick-track'), 0.6, {marginLeft: "-180px",ease: Quad.easeOut});
  TweenMax.to($('.slick-current'), 0.6, {x: 100,ease: Quad.easeOut});
});

$('.slick-next').on('mouseleave', function(){
  TweenMax.to($('.slick-track'), 0.4, {marginLeft: 0,ease: Quad.easeInOut});
  TweenMax.to($('.slick-current'), 0.4, {x: 0,ease: Quad.easeInOut});
});

