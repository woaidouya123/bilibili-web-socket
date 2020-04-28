import Socket from './Socket'
import { ajaxGet } from '../util/http'

/**
 * bilibili房间类
 */
class Room {
  constructor(roomid) {
    this.roomid = roomid,
    this.uid = null,
    this.host_server_list = [],
    this.token = null
  }

  _init() {
    ajaxGet('/getRoomId', { id: this.roomid }, (res) => {
      this.roomid = res.data.room_id
      this.uid = res.data.uid
      ajaxGet('/getHostAndToken', { id: this.roomid }, (res) => {
        this.host_server_list = res.data.host_server_list
        this.token = res.data.token
        this.socket = new Socket(this.roomid, this.uid, this.host_server_list,this.token)
        this.socket.init()
        
      })
    })
    
  }

  $start() {
    console.log(`加入房间${this.roomid}`)
    this._init()
    return this
  }

  /**
   * 销毁实例
   */
  $destroy() {
    // 关闭socket
    this.socket.close()
    this.socket = null

    console.log(`退出房间${this.roomid}`)
    this.roomid = null
  }

  $subscribe(fn) {
    const fns = Array.isArray(fn) ? fn : [fn]
    this.socket.addMethods(fns)
    return this
  }

}

export default Room
