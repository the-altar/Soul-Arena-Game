const myTeam = function () {
    return this.$store.getters["game/getMyCharList"](this.myId)
}

const myData = function () {
    return this.$store.getters['game/GetMyData'](this.myId)
}


const myId = function(){
    return this.$store.getters['user/getUserData'].id
}

const skill = function () {
    return this.$store.getters["game/getSkillByCaster"];
}


export default {
    myId,
    skill,
    myTeam,
    myData,
}