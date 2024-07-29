function initSlideshow(wrapId) {
    var Banner = document.querySelectorAll(`#${wrapId} .banner`);
    var Span = document.querySelectorAll(`#${wrapId} .tab span`);
    var Next = document.querySelector(`#${wrapId} .next`);
    var Prev = document.querySelector(`#${wrapId} .prev`);
    var wrap = document.getElementById(wrapId);

    //初始設定，顯示第一張圖，並將第一個圓點設定為on
    Banner[0].style.opacity = '1';
    Span[0].className = 'on';

    //註冊圓點控制項的onclick事件
    var num = 0;
    for (let i = 0; i < Span.length; i++) {
        Span[i].index = i;
        Span[i].onclick = function () {
            for (let j = 0; j < Span.length; j++) {
                num = this.index;
                Span[j].className = '';
                Banner[j].style.opacity = '0'
            }
            Span[num].className = 'on';
            Banner[num].style.opacity = '1';
        }
    }
    //按下Next到下一張
    Next.onclick = function () {
        for (let j = 0; j < Span.length; j++) {
            if (Span[j].className == 'on') {
                Span[j].className = '';
                Banner[j].style.opacity = '0';
                j++;
                num++;
                if (j > Span.length - 1) {
                    j = 0;
                }
                Span[j].className = 'on';
                Banner[j].style.opacity = '1';
            }
        }
    }
    //按下Prev到上一張
    Prev.onclick = function () {
        for (let j = 0; j < Span.length; j++) {
            if (Span[j].className == 'on') {
                Span[j].className = '';
                Banner[j].style.opacity = '0';
                j--;
                num--;
                if (j < 0) {
                    j = Span.length - 1;
                }
                Span[j].className = 'on';
                Banner[j].style.opacity = '1';
            }
        }
    }
    //設定自動輪播
    function Time() {
        num++;
        if (num < Span.length) {
            for (var j = 0; j < Span.length; j++) {
                Span[j].className = '';
                Banner[j].style.opacity = '0';
            }
            Span[num].className = 'on';
            Banner[num].style.opacity = '1';
        } else {
            num = 0;
            for (var j = 0; j < Span.length; j++) {
                Span[j].className = '';
                Banner[j].style.opacity = '0';
            }
            Span[num].className = 'on';
            Banner[num].style.opacity = '1';
        }
    }
    var timer = setInterval(Time, 2000);

    //滑鼠移入wrap時停止輪播
    wrap.onmouseover = function () {
        clearInterval(timer);
    }

    //滑鼠移出wrap時開始輪播
    wrap.onmouseout = function () {
        timer = setInterval(Time, 2000);
    }

    //RWD
    function tess() {
        var Img = document.querySelector(`#${wrapId} img`);
        var x = Img.clientHeight;
        wrap.style.height = x + 'px';
    }

    window.addEventListener('resize', tess);
    window.addEventListener('load', tess);
}

window.onload = function() {
    initSlideshow('wrap-1');
    initSlideshow('wrap-2');
}
