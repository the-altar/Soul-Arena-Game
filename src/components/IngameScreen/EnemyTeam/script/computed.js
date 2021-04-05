const enemyTeam = function(){
    const myId = this.$store.getters['user/getUserData'].id
    return this.$store.getters['game/getEnemyCharList'](myId)
}


export default {
    enemyTeam,
}