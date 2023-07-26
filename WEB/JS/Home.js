function changeLeft() {
    let a = document.getElementById("stories");
    let d = 50;
    let computedStyle = window.getComputedStyle(a);
    let leftValue = computedStyle.getPropertyValue("left");
    let rightValue = computedStyle.getPropertyValue("right");

    let left1 = parseInt(leftValue, 10);
    let right1 = parseInt(rightValue, 10);
    if (right1 >= 0) {

        let newleft = left1 + d;
        a.style.left = newleft + "px";
    } else {
        let a = document.getElementById("stories");
        a.setAttribute("justify-content", "flex-start");
    }

};


function changeRight() {
    let a = document.getElementById("stories");
    let d = 50;
    let computedStyle = window.getComputedStyle(a);
    let leftValue = computedStyle.getPropertyValue("left");
    let rightValue = computedStyle.getPropertyValue("right");

    let left1 = parseInt(leftValue, 10);
    let right1 = parseInt(rightValue, 10);
    if (right1 <= 30) {
        let newleft = left1 - d;
        a.style.left = newleft + "px";
    }
}


/*Hiếu thêm sau*/


function load_friends() {
    fetch(`/JSON/friends.json`)
        .then((res) => {
            return res.json();
        }).then((data) => {
            for (let i of data) {
                let a = document.getElementById("frie");
                a.innerHTML +=
                    `<div class="friend">
            <a href="#">
            <div class="friend-img">
                <img src="${i.img}" id="img-fr" alt="ảnh"> 
            </div>
        
            <div class="friend-name">
                <span id="name-fr">${i.name}</span>
            </div>
            </a>
            </div>`
            }
        });

};


function find_friends(obj) {
    let b = document.getElementById("frie");
    b.innerHTML = "";

    fetch(`/JSON/friends.json`)
        .then((res) => {
            return res.json();
        }).then((data) => {
            for (let i of data) {
                let namef = obj.value;
                let namet = i.name;
                let a = document.getElementById("frie");
                if (namet.search(namef) > -1) {
                    a.innerHTML +=
                        `<div class="friend">
                            <a href="#">
                                <div class="friend-img">
                                    <img src="${i.img}" id="img-fr" alt="ảnh"> 
                                </div>
                            
                                <div class="friend-name">
                                    <span id="name-fr">${i.name}</span>
                                </div>
                            </a>
                            
                        </div>`
                }
            }
        });

};

function heart(obj) {
    let a = obj;
    let colora = getComputedStyle(a);
    let thiscolor = colora.color;

    if (thiscolor === "rgb(255, 0, 0)" || thiscolor === "red") {
        a.style.color = "navy";
    } else {
        a.style.color = "red";
    }
}

function load_news() {
    let c = document.getElementById("h-load-news");
    // c.innerHTML = "";

    fetch(`/JSON/news.json`)
        .then((res) => {
            return res.json();
        }).then((data) => {
            let count = 1
            let d = document.getElementById("h-load-news");
            for (i of data) {

                d.innerHTML +=
                    `
            <div class="restore" id="restore${count}">
                            <h1>Bài viết đã được ẩn</h1>
                            <button class="btn-restore" onclick="restore_news(this)">Hoàn Tác</button>
                        </div>
            <div class="list-news" id="list-news${count}">
                <div class="n-name flex">
                    <div class="myImg">
                        <a href="/HTML/Profile.html">
                            <img src="${i.image}" alt="">
                        </a>
                    </div>
                    <div class="myName">
                        <a href="/HTML/Profile.html">
                            <h3>${i.name}</h3>
                        </a>
                    </div>
                    <div class="close">
                        <i class="fa-solid fa-xmark" onclick="hide_news(this)"></i>
                    </div>
                </div>
                <div class="n-infor">
                    <div class="box">
                        <p>${i.content} </p>
                    </div>
                    <button class="btn-more" onclick = click_more(this)>Xem thêm</button>
                    <button class="btn-less" onclick = click_less(this)>Rút gọn</button>
                    <div class="n-img">
                        <img src="${i.content_img}" alt="">
                    </div> 
                </div>
                <div class="n-heart flex">
                    <div class="heart">
                        <i class="fa-regular fa-heart" onclick="heart(this)"></i>
                    </div>
                    <div class="comment">
                        <i class="fa-regular fa-comment"></i>
                    </div>
                    <div class="share">
                        <i class="fa-regular fa-paper-plane"></i>
                    </div>
                </div>
            </div>`;
                count += 1;
            }
        })
}

//ẩn bài viết

function hide_news(obj) {
    let news = obj;
    let baiviet = news.parentNode.parentNode.parentNode;
    baiviet.style.opacity = 0;
    let idbaiviet = baiviet.id;
    let idrestoretemp = idbaiviet.slice(-1, idbaiviet.length); // số cuối của id bài viết
    let idrestore = "restore" + idrestoretemp
    let restore = document.getElementById(idrestore);
    setTimeout(() => {
        restore.style.opacity = 1;
    }, 50)

    setTimeout(function () {
        baiviet.style.display = "none";
        restore.style.display = "flex";
    }, 2000);
};

//Hoàn tác
function restore_news(obj) {
    let btnrestore = obj;
    let restore = btnrestore.parentNode;
    let idrestore = restore.id
    let idbaiviettemp = idrestore.slice(-1, idrestore.length); // số cuối của id nút restore
    let idbaiviet = "list-news" + idbaiviettemp;
    let baiviet = document.getElementById(idbaiviet);

    restore.style.display = "none";
    baiviet.style.display = "block";

    setTimeout(function () {
        baiviet.style.opacity = 1;
        baiviet.classList.add("wow");
        baiviet.classList.add("animate__animated");
        baiviet.classList.add("animate__backInUp");
    }, 50);

    setTimeout(() => {
        baiviet.classList.remove("wow");
        baiviet.classList.remove("animate__animated");
        baiviet.classList.remove("animate__backInUp");
    }, 1000)


}

// gototop

$(window).on("load", () => {
    $(document).ready(function () {
        $("#go").hide()
        $(window).scroll(() => {
            if ($(this).scrollTop() >= 300) {
                $("#go").show()
            }
            else {
                $("#go").hide()
            }
        })

        $("#go").click(function () {
            $("html,body").animate({
                scrollTop: 0
            }, 1000)
        })
    })
});

// như thêm
//nút xem thêm
function load_btn() {
    setTimeout(() => {
        let box = document.getElementsByClassName("box");
        for (i of box) {
            console.log(box);
            let height = parseFloat(i.offsetHeight);
            console.log(height);
            if (height <= 100) {
                let m = i.parentNode;
                let more = m.getElementsByTagName("button");
                for (j of more) {
                    console.log(more)
                    j.style.display = "none";
                }

            }
        }
    },1000)

}

//nút xem thêm 
function click_more(obj) {
    let btn = obj
    //alert("hello")
    let par = btn.parentNode
    //console.log(par)
    let child = par.querySelector(".box")
    let btn_less = par.querySelector(".btn-less")
    // console.log(child)
    child.style.maxHeight = "none"
    btn.style.display = "none"
    btn_less.style.display = "block"
}

//nút rút gọn
function click_less(obj) {
    let btn = obj
    let par = btn.parentNode
    //console.log(par)
    let child = par.querySelector(".box")
    let btn_more = par.querySelector(".btn-more")
    child.style.maxHeight = "100px"
    btn.style.display = "none"
    btn_more.style.display = "block"
}












