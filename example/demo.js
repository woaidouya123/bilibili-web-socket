import BILIWS from '../src/index'

const dom = window.document
let room = new BILIWS(4350043)
room.$start().$subscribe((msg)=>{
  console.log(msg)
  switch(msg.cmd){
    case 'WELCOME':
      welcome(msg)
      break
    case 'DANMU_MSG':
      addDanMu(msg)
      break
    case 'SEND_GIFT':
      sendGift(msg)
      break;
    default:
      break
  }
})
document.getElementById('btn').addEventListener('click', function () {
  const number = document.getElementById('input').value
  if (number) {
    if (/^\d+$/.test(number)) {
      room.$destroy()
      room = new BILIWS(Number(number))
      room.$start().$subscribe([addDanMu, addDanMu])
    }
  }
})

function addDanMu (res) {
  const div = dom.createElement('div')
  div.setAttribute('class', 'danmu')
  div.innerText = new Date().toLocaleTimeString() + ' $ ' + res.info[2][1] + '   :   ' + res.info[1]
  document.body.appendChild(div)
}

function welcome (res) {
  const div = dom.createElement('div')
  div.setAttribute('class', 'danmu')
  div.innerText = new Date().toLocaleTimeString() + ' $ 欢迎 '+res.data.uname+' 来到直播间'
  document.body.appendChild(div)
}

function sendGift (res) {
  const div = dom.createElement('div')
  div.setAttribute('class', 'danmu')
  div.innerText = new Date().toLocaleTimeString() + ' $ 感谢 '+res.data.uname+' 赠送的 '+res.data.num+"个"+res.data.giftName
  document.body.appendChild(div)
}
