// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 2_07.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('2_07 宅配ピザの特典', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/02Decision_Table/2_07/2_07.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })

  test.each([
    ["1","store",false,"500円","無し"],
    ["1","store",true,"500円","無し"],
    ["1","delivery",false,"500円","無し"],
    ["1","delivery",true,"400円","無し"],

    ["2","store",false,"500円","無し"],
    ["2","store",true,"500円","無し"],
    ["2","delivery",false,"1000円","無し"],
    ["2","delivery",true,"800円","無し"],

    ["3","store",false,"1000円","有り"],
    ["3","store",true,"1000円","有り"],
    ["3","delivery",false,"1500円","有り"],
    ["3","delivery",true,"1200円","有り"],

  ])('３択２箇所２択１箇（3*2*2=12）のデシジョンテスト', async(pizzaAmount,reserveType,isCoupon,expectedPriceResult,expectedFriedPotatoResult) => {
        
       // テキスト入力欄を取得し値を設定
        const button = dom.window.document.getElementById('run');
        const countSelectPulldown = dom.window.document.getElementById('count-select');
        const reserveTypeRadioButton = dom.window.document.getElementById(reserveType);
        const couponCheckBox = dom.window.document.getElementById("coupon");
        const result = dom.window.document.getElementById('result');
        
        countSelectPulldown.value = pizzaAmount;
        reserveTypeRadioButton.checked = true;
        couponCheckBox.checked =  isCoupon;

        // クリック
        button.click();

        // 結果の取得
        expect(result.innerHTML).toContain(expectedPriceResult);
        expect(result.innerHTML).toContain(expectedFriedPotatoResult);
  });

});
