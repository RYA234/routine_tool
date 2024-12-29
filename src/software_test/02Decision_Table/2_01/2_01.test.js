// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 2_01.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('1_07 武器の強化判定', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/02Decision_Table/2_01/2_01.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })

  test.each([
    [false,false,"490"],
    [true,true,"100"],
    [true,false,"290"],
    [false,true,"100"],
  ])('２択＊２のデシジョンテスト', async(isHappyHour,isCoupon,expectedResult) => {
        
       // テキスト入力欄を取得し値を設定
        const button = dom.window.document.getElementById('run');
        const happyHoursCheckBox = dom.window.document.getElementById("happyHour");
        const couponCheckBox = dom.window.document.getElementById("coupon");
        const result = dom.window.document.getElementById('result');
        happyHoursCheckBox.checked = isHappyHour;
        couponCheckBox.checked = isCoupon;
        // クリック
        button.click();
        // 結果の取得
        expect(result.innerHTML).toContain(expectedResult);
  });

});
