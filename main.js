const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const play = $('.banner__content-btn')
const music = $('.content__music-item ')
const audio = $("#audio")
const wapper = $('.content__music-list')
const items = wapper.querySelectorAll('.content__music-item ')
const next = $('.next')
const pre = $('.pre')
const loadding = $('.load_music')
const randomBtn = $('.headphone')
const fakeLayer = $('.fake_layer')







const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isReload: false,
    songs: [
        {
            name: "Đã lỡ yêu em nhiều",
            decription: "Justatee x Hoaprox",
            mp3: "./songs/mp3/da_lo_yeu_em_nhieu.mp3",
            image: "https://i1.sndcdn.com/artworks-000259082795-zaq81t-t500x500.jpg",
        },
        {
            name: "Phía sau đôi mắt",
            decription: "Anh Bạn Thành ft. SIDO",
            mp3: "./songs/mp3/phia_sau_doi_mat.mp3",
            image: "https://i.scdn.co/image/ab67616d0000b2731474c5df888cd81e0eed28b5",
        },
        {
            name: "Hum ney Sài Gòn cóa mưa không anh?",
            decription: "ChuChu",
            mp3: "./songs/mp3/hom_nay_sai_gon.mp3",
            image: "https://media.blogradio.vn/Upload/CMS/Nam_2014/Thang_9/Ngay_3/Images/Sai-gon-mua.jpg",
        },
        {
            name: "Đìu anh lun giữ kínk trong tym",
            decription: "Sơn Tùng M-TP Official",
            mp3: "./songs/mp3/dieu_anh_luon_giu_kinh_trong_tim.mp3",
            image: "https://2sao.vietnamnetjsc.vn/images/2021/02/23/01/30/5.jpg",
        },
        {
            name: "Flexin' trên circle K ",
            decription: "LowG",
            mp3: "./songs/mp3/flexin.mp3",
            image: "https://i1.sndcdn.com/artworks-000599815461-v6lxsr-t500x500.jpg",
        },
        {
            name: "Nến và hoa",
            decription: "Rhymastic",
            mp3: "./songs/mp3/nenvahoa.wav",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/09/08/2/f/f/7/1536397844669_640.jpg",
        },
        {
            name: "Vài lần đón đưa ",
            decription: "MCK cover",
            mp3: "./songs/mp3/vai_lan_don_dua.mp3",
            image: "https://nguoinoitieng.tv/images/nnt/101/0/bfx9.jpg",
        },
        {
            name: "Tình đén như ley cafe",
            decription: "Nân & Nger",
            mp3: "./songs/mp3/tinh_dang_nhu_ly_cafe.webm",
            image: "https://i1.sndcdn.com/artworks-000330573120-88askh-t500x500.jpg",
        },
        {
            name: "Vương",
            decription: "Nger",
            mp3: "./songs/mp3/vuong.webm",
            image: "https://billboardvn.vn/wp-content/uploads/2020/11/Ngo.jpg",
        },
        {
            name: "Xe đạp (lofi ver.)",
            decription: "Thùy Chi x CM1X",
            mp3: "./songs/mp3/xe_dap.mp3",
            image: "https://c-cl.cdn.smule.com/rs-s77/arr/e9/35/1982b3e9-99f4-488c-ad41-83c30b8af790_1024.jpg",
        },
        {
            name: "Vài câu nói lúc 10h45",
            decription: "GreyD x Seachains ",
            mp3: "./songs/mp3/vai_cau_noi.mp3",
            image: "https://i1.sndcdn.com/artworks-000562238283-uzjnxe-t500x500.jpg",
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
        <li class="content__music-item ${index === this.currentIndex ? 'isPlaying' : ''} " data-index="${index}" >
            <figure class="artist-avatar"><img src="${song.image}" alt=""></figure>
            
            <div>
            <h4 class="song-title">${song.name}</h4> 
            <p class="song-decription">${song.decription}</p>
            </div>
            <div class="song-methods">
            <span class="vote">5 <i class="fas fa-star star"></i></span>
            <span class="repeat"><i class="fas fa-repeat"></i></span>
            <span class="more"><i class="fas fa-caret-down"></i></span>
            </div>
        </li>
        `
        })
        $('.content__music-list').innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get() {
                return this.songs[this.currentIndex]
            }
        })
    }
    ,
    handleEvent: function () {
        play.onclick = () => {
            play.classList.toggle('amination')
            setTimeout(() => {
                play.classList.remove('amination')
            }, 500)
            if (this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            // khi phát nhạc 
            audio.onplay = () => {
                play.classList.add('playing')
                app.isPlaying = true
            }
            // khi dừng nhạc
            audio.onpause = () => {
                play.classList.remove('playing')
                app.isPlaying = false
            }
        }
        // Lắng nghe hành vi của người dùng
        wapper.onclick = (e) => {
            const songNode = e.target.closest('.content__music-item:not(.isPlaying)')
            const repeatBtn = e.target.closest('.repeat')
            if (songNode || repeatBtn) {
                if (songNode) {
                    if (songNode || repeatBtn) {
                        if (songNode) {
                            this.isPlaying = !this.isPlaying
                            if (this.isPlaying) {
                                audio.pause()
                            } else {
                                audio.play()
                            }
                            audio.onplay = () => {
                                play.classList.add('playing')
                                app.isPlaying = true
                            }
                            audio.onpause = () => {
                                play.classList.remove('playing')
                                app.isPlaying = false
                            }
                            app.currentIndex = Number(songNode.dataset.index)
                            app.loadCurrentSong()
                            audio.play()
                            app.render()
                        }
                    }
                }
            }
            if (repeatBtn) {
                if (audio.loop) {
                    audio.loop = false
                    repeatBtn.style.color = 'black'
                } else {
                    audio.loop = true
                    repeatBtn.style.color = '#dc48aa'
                }
            }
        }
        next.onclick = () => {
            this.currentIndex++
            if (app.currentIndex > app.songs.length - 1) {
                app.currentIndex = 0
                this.loadCurrentSong()
                audio.play()
                this.render()
            } else {
                this.loadCurrentSong()
                audio.play()
                this.render()
            }
            this.scrollInToView()
        }
        pre.onclick = () => {
            this.currentIndex--
            if (this.currentIndex < 0) {
                app.currentIndex = app.songs.length - 1
                this.loadCurrentSong()
                audio.play()
                this.render()
            } else {
                this.loadCurrentSong()
                audio.play()
                this.render()
            }
                this.scrollInToView()
        }
        audio.ontimeupdate = () => {
            const percent = 100 * audio.currentTime / audio.duration
            loadding.style.width = percent + '%'
        }
        randomBtn.onclick = () => {
            this.isPlaying = !this.isPlaying
            if (this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            audio.onplay = () => {
                play.classList.add('playing')
                app.isPlaying = true
            }
            audio.onpause = () => {
                play.classList.remove('playing')
                app.isPlaying = false
            }
            this.randomSong()
            this.loadCurrentSong()
            audio.play()
            this.render()
        }
        audio.onended = () => {
            this.currentIndex++
            if (app.currentIndex > app.songs.length - 1) {
                app.currentIndex = 0
                this.loadCurrentSong()
                audio.play()
                this.render()
            } else {
                this.loadCurrentSong()
                audio.play()
                this.render()
            }
        }
        fakeLayer.onclick = (e) => {
            const seekPercent = e.offsetX / fakeLayer.offsetWidth
            audio.currentTime = seekPercent * audio.duration
        }
    },
    loadCurrentSong: function () {
        audio.src = this.currentSong.mp3
    }
    ,
    scrollInToView: function () {
        setTimeout(() => {
            $('.content__music-item.isPlaying').scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
        }, 0)
    }
    ,
    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * app.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
    }
    ,
    start: function () {
        this.handleEvent()
        this.defineProperties()
        this.loadCurrentSong()
        this.render()
    }
}
app.start()