var Io = require('socket.io')
var users=[]
var connection =[]
function IO(server){
    let socket = Io.listen(server)
    socket.on('connection',client=>{
        client.on('disconnect',_=>{
            console.log('user disconnected')
        })
        client.on('sent-Admin', message => {
          socket.sockets.emit('new-message', "สวัสดีครับ")
            console.log(message)
        })
    })

}

export default IO