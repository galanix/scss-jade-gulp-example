var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube_video', {
    videoId: 'BvLuBEKUdqI',
    height: "100%",
    width: "100%"
  });
}

$(document).ready(function() {

     // @@include('partials/svg.js');

     // document.querySelector('.svg-placeholder').innerHTML = SVG_SPRITE;

     $('select').selectpicker();

      $('.responsive').slick({
       dots: false,
       infinite: true,
       speed: 300,
       slidesToShow: 3,
       slidesToScroll: 1,
       variableWidth: true,
       responsive: [
         {
           breakpoint: 1024,
           settings: {
               arrows: true,
             slidesToShow: 3,
             slidesToScroll: 1,
             infinite: true,
             dots: false
           }
         },
         {
           breakpoint: 770,
           settings: {
             arrows: true,
             slidesToShow: 2,
             slidesToScroll: 1,
           }
         },
         {
           breakpoint: 480,
           settings: {
             arrows: false,
             slidesToShow: 1,
             slidesToScroll: 1,
             centerMode: true,
           }
         }
       ]
     });

     var pausedSecond = 0,
         video_popup_player = $('#youtube_video').find('iframe'),
         video_src = video_popup_player.attr('src');

     $(".video__pic img").click(function () {
       $(".video-block__wrqpper").show();

       if (pausedSecond > 0) player.seekTo(pausedSecond);
       player.playVideo();
     });

     $(".close-modal-btn").click(function() {
       $(".video-block__wrqpper").hide();
       player.pauseVideo();
       pausedSecond = player.getCurrentTime();
     });

     
 });

function simpleSlider(elem){
  $(elem).next().css('display', 'none');
  $(elem+'.active').next().css('display', 'block');
  $(elem).click(function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      $(this).next().stop().slideUp(300);
    }
    else{
      $(this).addClass('active');
      $(this).next().stop().slideDown(300);
    }
  });
}
simpleSlider('.project__info__title');
simpleSlider('.profile__contracts__title');
simpleSlider('.profile__contracts__table__title');



$(function(){
    $('.faq_block .answer').hide();
    $a = $('.faq_block .question');
    $a.on('click', function(event) {
      event.preventDefault();

      if($(this).prev().hasClass('active')){
        $a.prev().removeClass('active');
        $(this).prev().removeClass('active');


      }
      else{
        $a.prev().removeClass('active');
        $(this).prev().addClass('active');

      }

      $a.not(this).next().slideUp(500);
      $(this).next().slideToggle(500);
    });
});


$(".header .nav-mobile").click(function(){
    $(".header .navbar-nav").toggleClass("open"); return false;
  });
$(".footer .nav-mobile").click(function(){
    $(".footer .navbar-nav").toggleClass("open"); return false;
  });

$('.project__offer__button').click(function(){
  $('.popup__overlay').fadeIn(400);
    $('.popup').stop().animate({
      left: '60%'
    }, 600, function(){
    $('.popup').stop().animate({
      left: '50%'
    }, 400);
  });
});

$('.auto').click(function(){
    $('.popup__overlay').fadeIn(400);
    $('#login-form.popup').stop().animate({
        left: '60%'
    }, 600, function(){
        $('#login-form.popup').stop().animate({
            left: '50%'
        }, 400);
    });
});

$('.graf').click(function(){
    $('.popup__overlay').fadeIn(400);
    $('#paytable-form.popup').stop().animate({
        left: '60%'
    }, 600, function(){
        $('#paytable-form.popup').stop().animate({
            left: '50%'
        }, 400);
    });
});

$('body').on('click', '.popup__overlay, .popup__propose__button', function(){

  $('.popup__overlay').fadeOut(400);

  $('.popup').stop().animate({
    left: '-100%'
  }, 600);
});

$('.project__more__offer').click(function(){

    if($(this).hasClass('active')){

      $(this).text('Показать все предложения');
      $('.project__table').stop().animate({ 'height' : '215px'}, 400);

    } else {
      $(this).text('Скрыть предложения');
      var fullHeight = $('.project__offer__table').height();
      $('.project__table').stop().animate({ 'height' : fullHeight}, 400);
    }
      $(this).toggleClass('active');
});

$('.project__offer__button__finish__red, .popup__propose__button').click(function(){
  $('.project__offer__finish__wrap, .project__offer__button').toggleClass('active');
});

$('.side__calc__text').click(function(){
  if($(this).hasClass('active')){
    $(this).parent().animate({'right': '-547px'}, 400);
  } else {
    $(this).parent().animate({'right': '0'}, 400);
  }
    $(this).toggleClass('active');
});
