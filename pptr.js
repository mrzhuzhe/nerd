const puppeteer = require('puppeteer');

const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

const config = {
  usr: "jayfangzhen@gmail.com",
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();


  //  var _cookie = 'locale=en-US; landing_url=https://om0tzip75x.feishu.cn/suite/passport/page/login/?redirect_uri=https%3A%2F%2Fom0tzip75x.feishu.cn%2Fadmin%2Findex%3Flang%3Dzh-CN%26open_in_browser%3Dtrue&app_id=13; s_v_web_id=verify_kshbonaj_99rpi7Ua_uVvu_4YtM_Awmb_jHaGWYqNfeD2; __tea__ug__uid=6997707470727530024; csrf_token=b4e09348-c36e-42d3-b367-2a312c0b01a9; MONITOR_WEB_ID=e790ffec679e0486bf322427f425940440c18572; swp_csrf_token=ae68218b-d2de-47c3-a62d-07f0d4e74696'

  await page.goto('https://om0tzip75x.feishu.cn/admin/index?lang=zh-CN&open_in_browser=true');

  //var _ok = await page.setCookie(parseCookie(_cookie))

  //console.log("ok", _ok)
  
  // 非扫码登陆
  await page.click(".switch-login-mode-box")
  // 邮箱登陆
  await page.click(".base-tabs-bar-container .base-tabs-bar:nth-child(2)")
    
  await page.waitForTimeout(1000);

  //  用户名
  await page.type(".base-input-box .base-input", config.usr, { delay: 100 })
  
  // 用户协议
  await page.click(".base-check-box")
  
  // 登陆
  await page.click(".pp-base-button.base-button.base-button-primary")
  
  await page.waitForTimeout(1000);

  //  邮箱验证码登陆
  await page.click(".verify-identity-container .pp-base-button:nth-child(3)")

  await page.waitForTimeout(1000);

  
  await page.$$eval(".base-code-box-input", (inputs) => {

    for (var i = 0; i < 6;i++) {
      //inputs[i].value = "1"
    }

  });




  //await page.waitForTimeout(15000);

  //await page.goto('https://om0tzip75x.feishu.cn/admin/drive/cloud-space');

  // 此处可以等待元素渲染完成
  //await page.waitForTimeout(3000);

  //const html = await page.$eval('.normal-table2__content.shadow-righ', (e) => e.outerHTML);

  //console.log(html)

  
})();