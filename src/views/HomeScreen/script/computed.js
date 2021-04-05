const userData = function (){
    return this.$store.getters['user/getUserData']
}

const currentTeam = function(){
    return this.$store.state.game.currentTeam
}

const isDisabled = function(){
    return this.$store.state.midori.disabled;
}

const currentTeamIds = function() {
    return this.$store.state.game.currentTeam.members.map(e=>{ return e.id })
}

const battleRoom = function(){
    return this.$store.state.game.room
}

export default {
    userData,
    isDisabled,
    currentTeam,
    currentTeamIds,
    battleRoom
}