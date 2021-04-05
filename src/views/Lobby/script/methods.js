const sendMessage = function(){
    if(this.message!='') 
        this.lobby.send("message", this.message)
}
export default {
    sendMessage
}