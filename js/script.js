$(function (){
    var $window = $(window);
    var $html = $("html");
    var windowHeight = $window.height();
    // 페이지 인덱스 : 화면이 스크롤된 위쪽 높이를 / 화면의 높이로 나눈다 / 결과를 올림 한다. 
    var lastPageIndex = $(".page").length - 1;
    var pageIndex = 0;
    let $logo = $("#menu > a");
    let $menuList = $("#menuList > li");
    let $beverage = $(".beverage")
    let $compassPin = $("#compassPin");
    $("<div id='overlay'></div>").appendTo("#menu");
    let $overlay = $("#overlay");
    let $navList = $("#menu > ul") 
    let $storeCompose = $("#storeCompose");
    let $cloud1 = $("<div></div>").addClass("cloudOn1").prependTo($(".store"));
    let $cloud2 = $("<div></div>").addClass("cloudOn2").prependTo($(".store"));
    let $storeLight = $("#storeLight")
    let $arm = $(".arm")
    var armrotate = [1, 2, 3, 5];
    let $bannerList = $(".promotionN");
    // 글씨 커졌다가 작아졌다가 하게 만든다. 
    var $clickme = $("#clickme")
    var topPosition = [9, 39, 69];
    // 배너가 아래에서 올라오게 만든다. 
    var $promotionList = $("#promotionList > li")
    var listTimer = [400, 600, 800]
    // 메뉴 간판 등장
    let $menu = $("#menuContent > div")
    // 브랜드 스토리 간판 들어오기
    let $logoBox = $("#logoBox");
    let $waterDrop = $("#waterDrop");
    // 빈 요소를 추가 후 탐색해서 변수에 담아 놓는다. 
    let $innerglow = $("<div></div>").addClass("innerglow").appendTo($("#logoBox"));
    let $glowBox = $("<div></div>").addClass("glowBox").appendTo($("#logoBox"));
    var menuPercent = [67, 40, 13];
    //-------------------------------------------------------------------------------


    $("#menu > button").on("click", function () {
        $navList.toggleClass("on");
        $overlay .toggleClass("on");
    })
    $overlay.on("click", function () {
        $navList.toggleClass("on");
        $overlay .toggleClass("on");
    })
    // 새로고침 시 다시 처음으로 이동
    window.setTimeout(backToHome,10);
    // 로고 클릭 시 다시 처음으로 이동
    $logo.on("click",function(){
        backToHome();
        window.setTimeout(RotatePin, 500);
    });
    // 메뉴 버튼 클릭하면 각 페이지 부분으로 이동한다. 
    $menuList.each(function(index){
        $(this).on("click",function(){
            
            // 같은 페이지일 경우 작동하지 않는다. 
            if(index == pageIndex)return;

            // 메인 클릭 시 애니메이션 재생
            if(index == 0){
                window.setTimeout(RotatePin, 500);
            }
            if(index == 1){
                bannerClear()

            if($window.innerWidth() <= 1577){
                promotionResize();
                if($window.innerWidth() <= 1160){
                    promotionResizeMini ();
                }
            }else bannerup();

            }
            if(index == 2){
                showMenu ();

                if($window.innerWidth() <= 1502){
                    menuPercent = [67, 35, 3]
                    $menu.removeAttr("style");
                    miniMenuShow();
                }else {
                    menuPercent = [67, 40, 13]
                    $menu.removeAttr("style");
                    miniMenuShow ();
                }if($window.innerWidth() <= 1190){
                    menuPercent = [0, 0, 0]   
                }

            }
            if(index == 3){
                logoBoxIn();
            }
            if(index == 4){
                StoreLightOn();
                StoreCompose ();
            }
            pageIndex = index;
            var posTop = windowHeight * pageIndex;
            $html.animate({scrollTop: posTop});
        });
    });
    // 페이지 스크롤링
    window.addEventListener("wheel",function (event) {
        // 기본 스크롤 이벤트 제거
        event.preventDefault();

        if($html.is(":animated"))return;

        // 만약 스크롤이 아래로 굴려졌을때
        if(event.deltaY > 0) {
            // 페이지 인덱스가 마지막 인덱스와 같아지면 작동취소
            // 아닐경우 페이지 인덱스를 하나 올린다.  
            if(pageIndex == lastPageIndex) return;
            pageIndex++;

        }else if(event.deltaY < 0){
            if(pageIndex <= 0)return;
            pageIndex--;
        }

        var posTop = windowHeight * pageIndex;

        $html.animate({scrollTop: posTop});

        // 페이지 별 설정
        if(pageIndex == 0){
            window.setTimeout(RotatePin, 500);
            if($window.innerWidth() <= 500){
                $clickme.html("Touch me!!")
            }
        }else if(pageIndex == 1){
            bannerClear()
            if($window.innerWidth() <= 1577){
                promotionResize();
                if($window.innerWidth() <= 1160){
                    promotionResizeMini ();
                }
            }else bannerup();

        }else if(pageIndex == 2){
            if($window.innerWidth() <= 1502){
                menuPercent = [67, 35, 3]
                $menu.removeAttr("style");
                miniMenuShow();
            }else {
                menuPercent = [67, 40, 13]
                showMenu();
            }if($window.innerWidth() <= 1190){
                menuPercent = [0, 0, 0]   
                miniMenuShow ();
            }
        }else if(pageIndex == 3){
            logoBoxIn(); 
        }else if(pageIndex == 4){
            StoreLightOn();
            StoreCompose ();
        }

    }, {passive: false});
    // 브라우저 높이 변경시  다시 높이 계산
    $window.on("resize", function(){
        windowHeight = $window.height();
    });
    window.setTimeout(function(){
        $beverage.css({
            transitionDuration: 500+"ms",
            opacity:1,
        });
        $(".beverage:nth-child(2)").css({
            transform: "rotate" + "(" + -30 + "deg)" + "translate("+ 0+ "," + 0 +"px)"
        });
        $(".beverage:nth-child(3)").css({
            transform: "translate("+ -50+ "%," + 0 +"px)"
        });
        $(".beverage:nth-child(4)").css({
            transform: "rotate" + "(" + 30 + "deg)" + "translate("+ 0+ "," + 0 +"px)"
        });
        // 나침반 회전
        window.setTimeout(RotatePin, 500);
    }, 500)
    // 나침반 회전
    $compassPin.on("click", RotatePin);
    $window.on("resize", function () {
            if($window.innerWidth() <= 1577){
                promotionResize();
            }else {
                bannerup();
            } if($window.innerWidth() <= 1502){
                menuPercent = [67, 35, 3]
                miniMenuShow();
            }else {
                menuPercent = [67, 40, 13]
                miniMenuShow ();
            } if($window.innerWidth() <= 1190){
                menuPercent = [0, 0, 0]            
                miniMenuShow ();
            }
            if($window.innerWidth() <= 1160){
                promotionResizeMini ();
            }if($window.innerWidth() <= 930){
                StoreCompose2 ();
            }else{
                StoreCompose1 ();
            }
            if($window.innerWidth() <= 500){
                $clickme.html("Touch me!!")
            }else{
                $clickme.html("Click me!!")
            }
    }); 
    if($window.innerWidth() <= 500){
        $clickme.html("Touch me!!")
    }else{
        $clickme.html("Click me!!")
    }
    //-------------------------------------------------------------------------------
    function showMenu() {
        $menu.removeAttr("style");
        window.setTimeout(function(){
            $menu.each(function(index){
                $(this).css({
                    right: menuPercent[index] + "%",
                    transitionDuration: 1000 + "ms"
                })
            });
        }, 400);
    }
    function Listfunc(){
        $promotionList.each(function(index){
            window.setTimeout(function(){
                $(this).css({
                    top: "50%",
                    transitionDuration: "1000ms",
                    opacity: 1
                })
            },listTimer[index])
        })
    }
    function bannerup(){
        // 일단 내려서 지운다. 
        $promotionList.removeAttr("style")
        $promotionList.each(function(){$(this).css("top", "200%").css("opacity", 0)})

        // 50ms뒤에 올라오도록 만든다. 
        $promotionList.each(function(index){
            window.setTimeout(function(){
                $promotionList.eq(index).css({
                    top: "50%",
                    transitionDuration: "1000ms",
                    opacity: 1,
                    borderRadius : 30 + "px"
                })
            },listTimer[index])
        })
    }
    function logoBoxIn() {
        $waterDrop.removeAttr("style");
        $glowBox.removeAttr("style");
        $innerglow.removeAttr("style");
        $logoBox.removeAttr("style").css("transform","translate(-100%, 0)");
        window.setTimeout(function () {
            $logoBox.css({
                transform: "translate(0,0)",
                transitionDuration: "500ms"
            })
        }, 500);

        window.setTimeout(function () {
            $waterDrop.css({
                opacity: 1,
                animationName: "drop",
                animationTimingFunction: "cubic-bezier(1,0,.91,.19)",
                animationDuration: "1s",
                animationIterationCount: 1
            })
            window.setTimeout(function() {
                $glowBox.css({
                    animation : "backglow 10s ease infinite"
                })
                $innerglow.css({
                    opacity: 1 ,
                    backgroundColor: "#feffef"
                })
            }, 1000)
        }, 500);
    }
    function StoreLightOn () {
        $storeLight.removeAttr("style")
        $arm.removeAttr("style")
        window.setTimeout(function () {
            // 전등 불빛
            $storeLight.css({
                animation : "LightOn 1s ease 1"
            })    
            $arm.each(function (index) {
                $(this).css({
                    animation: "armRotate" + index + " 3s "+ armrotate[index] +"s ease 1"
                })
            });
        }, 500)
    }
    function RotatePin() {
        $compassPin.removeAttr("style")
        $clickme.css("opacity", "0").css("transitionDuration", 200+"ms");
        window.setTimeout(function(){
            $compassPin.css("animation", "rotate 2s ease 1");
        }, 50)
        window.setTimeout(function(){
            $clickme.css("opacity", "1").css("transitionDuration", 1000+"ms");
        }, 2000)
    }
    function backToHome(){
        $html.animate({scrollTop: 0 });
        window.setTimeout(function(){
            $window.scrollTop(0); 
            pageIndex = Math.ceil($window.scrollTop() / $(window).height());    
        },20);
    }
    function bannerClear(){
        $promotionList.removeAttr("style")
        $promotionList.each(function(){$(this).css("top", "200%").css("opacity", 0)})
    }
    function promotionResize(){   
        $bannerList.each(function (index) {
            $(this).children().children().attr("src", "img/promotionWide"+index+'.png') 
        });
        $promotionList.each(function(index){
            window.setTimeout(function(){
                $promotionList.eq(index).css({
                    top: topPosition[index] + "%",
                    transitionDuration: "700ms",
                    opacity: 1,
                    borderRadius : 30 + "px"
                })
            },listTimer[index])
        })
    }
    function promotionResizeMini (){
        $bannerList.each(function (index) {
            $(this).children().children().attr("src", "img/promotionMini"+index+'.png') 
        });
    }
    function bannerup(){
        $bannerList.each(function (index) {
            $(this).children().children().attr("src", "img/promotion"+index+'.png') 
        });
        // 50ms뒤에 올라오도록 만든다. 
        $promotionList.each(function(index){
            window.setTimeout(function(){
                $promotionList.eq(index).css({
                    top: "50%",
                    transitionDuration: "1000ms",
                    opacity: 1,
                    borderRadius : 30 + "px"
                })
            },listTimer[index])
        })
    }
    function miniMenuShow () {
        window.setTimeout(function(){
            $menu.each(function(index){
                $(this).css({
                    right: menuPercent[index] + "%",
                    transitionDuration: 1000 + "ms"
                })
            });
        }, 400);
    }
    function StoreCompose () {
        if($window.innerWidth() <= 930){
            StoreCompose2 ();
        }else{
            StoreCompose1 ();
        }
    }
    function StoreCompose1 () {
        $storeCompose.attr("src", "img/composeStore.png")
        $storeLight.attr("src", "img/StoreLight.png")
    }
    function StoreCompose2 () {
        $storeCompose.attr("src", "img/composeStore2.png")
        $storeLight.attr("src", "img/StoreLight2.png")
    }
    function bannerChange () {
        if($window.innerWidth() <= 1060){
            bannerChange1 ();
        }else{
            bannerChange2 ();
        }
    }
    function bannerChange1 () {
        $storeCompose.attr("src", "img/composeStore.png")
        $storeLight.attr("src", "img/StoreLight.png")
    }
    function bannerChange2 () {
        $storeCompose.attr("src", "img/composeStore2.png")
        $storeLight.attr("src", "img/StoreLight2.png")
    }
}); //document.onready