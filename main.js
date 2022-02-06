const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PlAYER_STORAGE_KEY = "TCN_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const headingsub = $("header h4");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist-main");
const ondurationTime = $(".header__progress-duration");
const currentTimeView = $(".header__progress-currentTime");
const volumeChange = $("#progress-volume");
const onTab = $('.sub-mobile-category__heading-icon');
const tabView = $('.sub-mobile-category');
const app = {
    volumeValue: 100,
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isTab: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Ai Chung Tình Được Mãi",
            singer: "Đinh Tùng Huy",
            path:
              "./assets/music/Ai Chung Tinh Duoc Mai - Dinh Tung Huy (1).mp3",
            image:
              "https://data.chiasenhac.com/data/cover/151/150118.jpg"
          },
          {
            name: "Vui lắm nha",
            singer: "Hương Ly",
            path: "https://data.chiasenhac.com/down2/2217/6/2216465-0ddd4ca9/128/Vui%20Lam%20Nha%20-%20Huong%20Ly_%20Jombie.mp3",
            image:
              "https://data.chiasenhac.com/data/cover/153/152594.jpg"
          },
          {
            name: "Lưu số em đi",
            singer: "HUVA Remix",
            path: "https://data.chiasenhac.com/down2/2220/6/2219819-ea722e6f/128/Luu%20So%20Em%20Di%20HUVA%20Remix_%20-%20Huynh%20Van_%20Vu.mp3",
            image:
              "https://data.chiasenhac.com/data/cover/154/153664.jpg"
          },

          {
              name: "Giao quẻ",
              singer: "Hoàng Thùy Linh",
              path: "https://data.chiasenhac.com/down2/2216/6/2215074-8d51eab0/128/Gieo%20Que%20-%20Hoang%20Thuy%20Linh_%20Den.mp3",
              image: "https://data.chiasenhac.com/data/cover/153/152195.jpg"
          },
          {
            name: "Wave",
            singer: "Band Wave",
            path: "https://data.chiasenhac.com/down2/2215/6/2214359-3b5a1ac9/128/WaVeStar%20-%20WaVe_%20Arena%20Of%20Valor.mp3",
            image: "https://data.chiasenhac.com/data/cover/152/151902.jpg"
          },
          {
            name: "Señorita",
            singer: "S.Mendes & C.Cabello",
            path: "https://data.chiasenhac.com/down2/2211/6/2210243-9c0b5785/128/Senorita%20-%20Shawn%20Mendes_%20Camila%20Cabello.mp3",
            image: "https://data.chiasenhac.com/data/cover/107/106207.jpg"
          },

          {
            name: "Stitches",
            singer: "Shawn Mendes",
            path: "./assets/music/Stitches - Shawn Mendes.mp3",
            image: "https://data.chiasenhac.com/data/cover/40/39771.jpg"
          },

          {
            name: "Không Trọn Vẹn Nữa",
            singer: "Châu Khải Phong",
            path: "https://data.chiasenhac.com/down2/2216/6/2215070-296b7300/128/Khong%20Tron%20Ven%20Nua%20-%20Chau%20Khai%20Phong_%20AC.mp3",
            image: "https://data.chiasenhac.com/data/cover/153/152193.jpg"
          },

          {
            name: "Giữa Đại Lộ Đông Tây",
            singer: "Uyên Linh",
            path: "https://data.chiasenhac.com/down2/2165/6/2164502-2ffc93ee/128/Giua%20Dai%20Lo%20Dong%20Tay%20-%20Uyen%20Linh.mp3",
            image: "https://data.chiasenhac.com/data/cover/139/138656.jpg"
          },

          {
            name: "Sài Đau Lòng Quá",
            singer: "Hứa Kim Tuyền",
            path: "https://data.chiasenhac.com/down2/2162/6/2161930-9845d4d3/128/Sai%20Gon%20Dau%20Long%20Qua%20-%20Hua%20Kim%20Tuyen_%20Ho.mp3",
            image: "https://data.chiasenhac.com/data/cover/138/137965.jpg"
          },


    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
      },
    rander: function()
    {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="col l-2-4 m-4 c-6 ">
                        <div class="song ${index === this.currentIndex? 'active':''} " data-index = "${index}">
                            <div class="thumb" style="background-image: url('${song.image}')"></div>
                            <h4 class="title">${song.name} </h4>
                            <div class="song-item-action song-item-icon-like--liked">
                                <!-- home-product-item-icon-like--liked -->
                                <span class="song-like active">
                                    <i class="song-icon-empty far fa-heart"></i>
                                    <i class="song-like-icon-fill fas fa-heart"></i>
                                </span>
                            </div>
                            <h3 class="author">
                                ${song.singer}
                            </h3>
                        </div>
    
                    </div>
            `

        })
        playlist.innerHTML = htmls.join('')

    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
          get() {
            this.setConfig("currentIndex", this.currentIndex);
            return this.songs[this.currentIndex];
          }
        });
      },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        headingsub.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
      },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.currentIndex = this.config.currentIndex || this.currentIndex;
        // volumeChange.value = Number(this.config.volumeChange) || this.volumeValue;
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
        
       
      },
    
    nextSong: function () {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;

        }
        this.loadCurrentSong();
    },

    preSong: function () {
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1;
        }
        this.loadCurrentSong();

    },

    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
            
        } while (newIndex ===this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
        app.rander();
        app.scrollToActiveSong();

    },
    scrollToActiveSong: function (){
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })

        },200
        )
    
    },
    


    handelEvents: function(){

        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
          });
          cdThumbAnimate.pause();


        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause();         
            }
            else {
                audio.play();
            }
        };

        audio.onplay = function(){
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        audio.onpause = function(){
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };

        audio.onended = function(){
            if(app.isRepeat){
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }

        nextBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong();
            }
            else{
                app.nextSong();
                audio.play();
                app.rander();
                app.scrollToActiveSong();
            }
           
        };

        prevBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong();
            }
            else{
                app.preSong();
                audio.play();
                app.rander();
                app.scrollToActiveSong();
                
            }
            
            
        };

        randomBtn.onclick = function (e) {
            app.isRandom = !app.isRandom;
            app.setConfig("isRandom", app.isRandom);
            randomBtn.classList.toggle("active", app.isRandom);
            
        };

        repeatBtn.onclick = (e => {
            app.isRepeat = !app.isRepeat;
            app.setConfig("isRepeat", app.isRepeat);
            repeatBtn.classList.toggle("active", app.isRepeat);
        });

        playlist.onclick = function(e){
            const songNode = (e.target.closest('.song'));
            if (songNode || e.target.closest('song-item-action'))  {
               if(songNode)
               {
                app.currentIndex = Number(songNode.getAttribute('data-index'));
                
                app.rander();
                app.loadCurrentSong();
                audio.play();
               }
               else if (e.target.closest('song-item-action')){

               }
            }
            
        };

        audio.ontimeupdate = function(){
            if(audio.duration && checkOnmouseAndTouch){
                ondurationTime.textContent =  Math.floor(audio.duration / 60) + ":" + "" + Math.floor(audio.duration % 60);
                currentTimeView.textContent =  Math.floor(audio.currentTime / 60) + ":" + "" + Math.floor(audio.currentTime % 60);
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // progress.onchange = (e => audio.currentTime = audio.duration /100 *e.target.value);
        let checkOnmouseAndTouch = true;
        progress.onmousedown = function() {
            checkOnmouseAndTouch = false;
        }

        progress.ontouchstart = function() {
            checkOnmouseAndTouch = false;
        }

        // Khi bài hát được tua
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;

            checkOnmouseAndTouch = true;
        }
        volumeChange.onchange = function (e) {
            // volumeValue = e.target.value;
            // console.log(volumeValue)
            audio.volume = (e.target.value) / 100;
            // app.setConfig("volumeValue", app.volumeValue);
        }

        onTab.onclick = function (e) {
            if(app.isTab){
                tabView.style.display = "none";
                app.isTab = false;
            }
            else {
                tabView.style.display = "block";
                app.isTab = true;
            }
            
        }

        
        



    },

    start: function()
    {
        this.loadConfig();
        this.defineProperties();
        this.handelEvents();
        this.loadCurrentSong();
        this.rander();
        
        
        
    }
}

app.start();