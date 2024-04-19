var allLazyLoad = [...document.querySelectorAll('.lazyload')];
function allLozadImg() {
    allLazyLoad.forEach((el) => {
        var observer = lozad(el);
        observer.observe();
        el.addEventListener('load', () => {
            el.classList.add('is-loaded')
        })

    })
}
allLozadImg();

$(".btn-top").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $([document.documentElement, document.body]).animate({
        scrollTop: $('body').offset().top
    }, 600);
});

$(window).scroll(function (e) {
    $el = $('.header');
    $el.toggleClass('header-fixed', $(this).scrollTop() > 32);

});

//video controls

var player3;

function createVideo(videoBlockId, videoId) {
    player3 = new YT.Player(videoBlockId, {
        videoId: videoId,
        playerVars: {
            // 'autoplay':1,
            'autohide': 1,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playsinline': 1,
            'fs': 1,
            'allowsInlineMediaPlayback': true
        },
        events: {
            'onReady': function (e) {
                // e.target.mute();
                // if ($(window).width() > 991) {

                e.target.playVideo();

                // }
            }
        }
    });
}


let botSlides = [...document.querySelectorAll('.play-btn')];

function videoControlSlides() {
    if (botSlides.length) {
        botSlides.forEach((btn) => {
            let type = btn.dataset.videoType;
            let id = btn.dataset.videoId;
            let videoCont = btn.closest('.section-media');
            btn.addEventListener('click', () => {
                videoCont.dataset.videoType = type;
                videoCont.dataset.videoId = id;

                let videoId = id;

                botSlides.forEach((btn2) => {
                   if (btn === btn2) {

                   } else {
                       if (btn2.classList.contains('pause')) {
                           btn2.click();
                       }
                   }
                });


                if (type === 'vimeo') {
                    var player2 = new Vimeo.Player(btn.closest('.section-media').querySelector('.vimeo-player'));

                    if (btn.classList.contains('pause')) {
                        player2.pause();
                        btn.classList.remove('pause');
                        btn.closest('.section-media').classList.remove('hide-poster');
                    } else {
                        player2.play();
                        btn.classList.add('pause');
                        btn.closest('.section-media').classList.add('hide-poster');
                    }

                } else {
                    if (type === 'video') {
                        if (btn.classList.contains('pause')) {
                            $(btn).closest('.section-media').find('.video-box .video').html('');
                            btn.classList.remove('pause');
                            btn.closest('.section-media').classList.remove('hide-poster');
                        } else {
                            let videoBl = document.createElement('video');
                            videoBl.src = id;
                            videoBl.playsinline = true;
                            videoBl.controls = false;


                            btn.classList.add('pause');
                            btn.closest('.section-media').classList.add('hide-poster');

                            $(btn).closest('.section-media').find('.video-box .video').append(videoBl);
                            $(btn).closest('.section-media').find('.video-box video')[0].play();
                        }


                    } else {
                        if (btn.classList.contains('pause')) {
                            $(btn).closest('.section-media').find('.video-box .video').html('');
                            btn.classList.remove('pause');
                            btn.closest('.section-media').classList.remove('hide-poster');
                        } else {
                            $(btn).closest('.section-media').find('.video-box .video').append('<div class="video-iframe" id="' + videoId + '"></div>');
                            createVideo(videoId, videoId);
                            btn.classList.add('pause');
                            btn.closest('.section-media').classList.add('hide-poster');
                        }


                    }
                }


            })
        })
    }
}

videoControlSlides();


