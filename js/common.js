$(function() {

  $('html').addClass('js');

  // link

  // click tracking google ana

  // target = _blank
  var site = location.hostname;
  $('a[href^=http]').not('[href*="' + site + '"]').attr('target', '_blank').addClass("external").on('mousedown, keydown', function(e) {
    var ahref = jQuery(this).attr('href');
    if (ahref.indexOf("chiharu-shiota.jpn.org") != -1 || ahref.indexOf("http") == -1) {
      _gaq.push(['_trackEvent', 'Inbound Links', 'Click', ahref]);
    } else {
      _gaq.push(['_trackEvent', 'Outbound Links', 'Click', ahref]);
    }
  });

  // pdf
  $("a[href$='pdf']").attr('target', '_blank');

  // navi

  $('#navi').each(function() {
    $(this).children('span:first').addClass('first');
    $(this).children('span:last').addClass('last');
  });

  // home

  var length1 = $(".slideShow").length;
  if (length1 > 0) {
    $('.slideShow').slidesjs({
      play: {
        effect: "fade",
        interval: 6000,
        auto: true,
        pauseOnHover: true
      },
      effect: {
        fade: {
          speed: 1300,
          // speed:0, // only one item
          // [number] Speed in milliseconds of the fade animation.
          crossfade: true
          // [boolean] Cross-fade the transition.
        }
      },
      callback: {
        loaded: function(number) {
          // Show start slide in log
          $('.slidesjs-log .slidesjs-slide-number').text(number);
          var activeSlide = $('.caption span').eq(number - 1);
          $(activeSlide).show();
          $(activeSlide).siblings().hide();
        },
        complete: function(number) {
          // Change slide number on animation complete
          $('.slidesjs-log .slidesjs-slide-number').text(number);
          var activeSlide = $('.caption span').eq(number - 1);
          $(activeSlide).show();
          $(activeSlide).siblings().hide();
        }
      },
      navigation: {
        active: false
      },
      pagination: {
        active: true,
        effect: "fade"
      }
    });

    var slideLength = $('.slide').length;
    $('.slide-num').text(slideLength);

  }

  $('.subhead:first').css('margin-top', 0);

  $('.news .segment').each(function() {
    $(this).children('.style:first').css('margin-top', 0);
  });

  // works

  var localNavi = $('.works .localNavi');

  var query = location.search; // 一覧ページ：クエリを取得。
  if (query.match(/^\?y=/)) {
    $(localNavi).find('a[href="' + query + '"]').addClass('active');
  } else if (query == "") {
    $(localNavi).eq(0).find('a:first').addClass('active');
  }

  $(localNavi).on({
    'mouseenter': function() {
      $(this).css('cursor', 'pointer');
      $(this).children('ul').stop().slideDown();
    },
    'mouseleave': function() {
      $(this).children('ul').stop().slideUp();
    }
  });

  $('.works select.localNavi').on({
    'change': function() {
      var link = $(this).val();
      location.href = link;
    }
  });

  $('.works .gallery').each(function() {
    $(this).children('a:nth-child(2n)').addClass('mlt2');
    $(this).children('a:nth-child(3n)').addClass('mlt3');
    $(this).children('a:nth-child(5n)').addClass('mlt5');
  });

  /*
  var length2 = $(".gallery a").length;
  if (length2 > 0) {
    $(".gallery a").fancybox();
  }
*/

  var length2 = $(".gallery a").length;
  if (length2 > 0) {
    $(".gallery a").fancybox({
      afterLoad: function() {
        this.title = $(this.element).children('div').html();
      },
      helpers: {
        title: {
          type: 'inside'
        }
      }
    });
  }

  // biography

  var localNavi2 = $('.biography #localNavi');
  if (localNavi2.length > 0) {

    var location_hash = location.hash;
    if (location_hash.length > 0) {
      $('.biography .section').hide();
      $('.biography .section' + location_hash).show();
    }

    $(localNavi2).children('a').on('click', function() {
      var bioIndex = $(this).index();
      var bioOutput = $('.biography .section').eq(bioIndex);
      $(bioOutput).siblings('.section').hide();
      $(bioOutput).fadeIn();
      return false;
    });

  }

  // publication press

  var length3 = $(".publication-press").length;
  if (length3 > 0) {
    $(".publication-press .right a").fancybox();
  }

  // mail
  $('.mail').each(function() {
    var string = $(this).text();
    arr_Mail = string.split(',');
    var mailTo = arr_Mail[0].replace(/\[at\]/, '@');

    if (arr_Mail[1]) {
      var txt = arr_Mail[1];
    } else {
      var txt = mailTo;
    }

    $(this).html('<a href="mailto:' + mailTo + '">' + txt + "</a>");
  });

  // footer
  $('.footer-contact').html(function() {
    var user = 'office';
    var domain = 'chiharu-shiota.com';
    return '<a href="mailto:' + user + '@' + domain + '">' + '<i class="fa fa-envelope-o" aria-hidden="true"></i>' + '</a>';
  });

});
