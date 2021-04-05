const selectCharacterMethod = function(char, play){
    if(play) this.$store.dispatch("audio/playClick") 
    this.$emit("char-selected", char)
}

const emitAddToTeam=function(char){
    this.$emit("add-to-team", char)
} 

export default {
    selectCharacterMethod,
    emitAddToTeam
}