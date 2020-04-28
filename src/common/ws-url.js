/**
 * 获取对应的ws-url地址
 */
function parseUrl(server){
  let wsUrl = 'ws://broadcastlv.chat.bilibili.com:2244/sub'
  if(typeof server === 'string'){
    wsUrl = 'ws://'+server+'/sub'
  }
  if(typeof server === 'object'){
    wsUrl = 'ws://'+server.host+':'+server.ws_port+'/sub'
    if (window !== undefined) {
      let protocol = location.origin.match(/^(.+):\/\//)[1]
      if (protocol === 'https') {
        wsUrl = 'wss://'+server.host+':'+server.wss_port+'/sub'
      }
    }
  }
  return wsUrl;
}
export default parseUrl
