export default {
    namespaced: true,
    state: {
        turnSound: null,
        gameStart: null,
        click:null,
        home:[],
        win:null,
        lose:null,
    },
    mutations: {
        setAudio: async function (state) {
            state.turnSound = new Audio("/sound/endturn.mp3")
            state.gameStart = new Audio("/sound/GameStart.mp3")
            state.click = new Audio("/sound/click.mp3")
            state.changeIntoBattle = new Audio("/sound/ChangeIntoBattle.mp3")
            state.snap = new Audio("/sound/snap.mp3")
            state.blocked  = new Audio("/sound/NotAllowed.mp3")
            state.lose = new Audio("/sound/over.mp3")
            state.win = new Audio("/sound/period.mp3")

            state.home.push({
                name:"Grand Prix [8-Bit Remix]",
                author: "branflakes",
                contact: "https://twitter.com/branflakesmusic",
                sound: new Audio("/sound/GrandPrix.mp3")
            })

            state.lose.volue = 0.1
            state.win.volume = 0.1 
            state.blocked.volume = 0.5 
            state.snap.volume = 0.5
            state.click.volume = 0.5
            state.gameStart.volume = 0.1
            state.turnSound.volume = 0.2
            state.changeIntoBattle.volume = 0.1
        }
    },
    getters:{
        getHomeMusic:function(state){
            return state.home[0]
        }
    },
    actions: {
        playTurnSound({ state }) {
            state.turnSound.play()
        },
        playGameStart({ state }) {
            setTimeout(() => {
                state.gameStart.play()
            }, 1000)
        },
        async playClick({state}){
            state.click.play()
        },
        async changeIntoBattle({state}){
            state.changeIntoBattle.play()
        },
        async playSnap({state}){
            state.snap.play()
        },
        async playBlocked({state}){
            state.blocked.play()
        },
        async playWin({state}){
            state.win.play()
        },
        async playLose({state}){
            state.lose.play()
        }
    },
}