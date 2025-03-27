//Thu Mar 27 2025 11:50:22 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const CryptoJS = require("crypto-js"),
  axios = require("axios"),
  accountInfo = process.env.jczpck,
  accounts = accountInfo.split("\n");
function aesEncrypt(_0x125df4, _0x27c8e4, _0x2bd995) {
  var _0x27c8e4 = CryptoJS.enc.Utf8.parse(_0x27c8e4),
    _0x2bd995 = CryptoJS.enc.Utf8.parse(_0x2bd995),
    _0x584f0d = CryptoJS.AES.encrypt(_0x125df4, _0x27c8e4, {
      iv: _0x2bd995,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return _0x584f0d.ciphertext.toString().toUpperCase();
}
function md5Encrypt(_0x4e65b2) {
  return CryptoJS.MD5(_0x4e65b2).toString();
}
async function signIn(_0x446b4e, _0x1b20f6, _0xe4b426, _0x2aeacf) {
  try {
    const _0x547c82 = await axios.post("https://erp.5jingcai.com/signIn/signIn", {
      loginFrom: "wx",
      memberId: _0x446b4e,
      token: _0x1b20f6,
      loginType: "wx",
      fromType: "",
      flag: "weixin",
      ivKey: _0xe4b426,
      signIv: _0x2aeacf,
      sendFlag: "0"
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + _0x1b20f6,
        xweb_xhr: "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/8447",
        Accept: "*/*",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://servicewechat.com/wxb848fb987b3393a8/326/page-frame.html",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9"
      }
    });
    console.log("签到结果：", _0x547c82.data);
  } catch (_0x40ec69) {
    console.error("签到出错：", _0x40ec69);
  }
}
async function processAccounts(_0x2afad7) {
  for (const _0x3ed642 of _0x2afad7) {
    const [_0x1d6a7b, _0x2d5e67] = _0x3ed642.split("#"),
      _0xb8fa38 = new Date().getTime().toString();
    console.log("原始 ivKey (时间戳):", _0xb8fa38);
    const _0x2fe6a9 = aesEncrypt(_0xb8fa38, "0603080708080808", "0603080708080808"),
      _0x1b970e = "memberId=" + _0x1d6a7b + "&loginType=wx&token=" + _0x2d5e67 + "&ivKey=" + _0xb8fa38;
    console.log("原始 signIv 字符串:", _0x1b970e);
    const _0x400ec3 = md5Encrypt(_0x1b970e);
    console.log("ivKey:", _0x2fe6a9);
    console.log("signIv:", _0x400ec3);
    await signIn(_0x1d6a7b, _0x2d5e67, _0x2fe6a9, _0x400ec3);
  }
}
processAccounts(accounts).then(() => {
  console.log("所有账号处理完毕");
}).catch(_0x5152f8 => {
  console.error("处理过程中发生错误:", _0x5152f8);
});