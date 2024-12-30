// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 2_06.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('2_04 プリペイドカードのチャージ特典', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/02Decision_Table/2_06/2_06.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })


  const badResult1= "部屋を探し出せませんでした。";
  const badResult2= "部屋を探しだしました。しかし、鍵がないので部屋に入れません。";
  const badResult3= "部屋を探しだしました。そして、部屋に入れました。しかし、魔王を倒すには剣が必要です。";
  const bestResult= "部屋を探しだしました。そして、部屋に入れました。魔王を倒しました。";
  

  test.each([
    ["silver","three_thousand",false,"結果:1%プラス"],
    ["silver","three_thousand",true,"結果:1%プラス"],
    ["silver","five_thousand",false,"結果:2%プラス"],
    ["silver","five_thousand",true,"結果:2%プラス_クーポン有り"],
    ["silver","ten_thousand",false,"結果:4%プラス"],
    ["silver","ten_thousand",true,"結果:4%プラス_クーポン有り"],

    ["gold","three_thousand",false,"結果:3%プラス"],
    ["gold","three_thousand",true,"結果:3%プラス"],
    ["gold","five_thousand",false,"結果:5%プラス"],
    ["gold","five_thousand",true,"結果:5%プラス_クーポン有り"],
    ["gold","ten_thousand",false,"結果:10%プラス"],
    ["gold","ten_thousand",true,"結果:10%プラス_クーポン有り"],

    ["black","three_thousand",false,"結果:5%プラス"],
    ["black","three_thousand",true,"結果:5%プラス"],
    ["black","five_thousand",false,"結果:7%プラス"],
    ["black","five_thousand",true,"結果:7%プラス_クーポン有り"],
    ["black","ten_thousand",false,"結果:15%プラス"],
    ["black","ten_thousand",true,"結果:15%プラス_クーポン有り"],

  ])('３択２箇所２択１箇（3*3*2=18）のデシジョンテスト', async(rank,charge,isElected,expectedResult) => {
        
       // テキスト入力欄を取得し値を設定
        const button = dom.window.document.getElementById('run');
        const rankRadioButton = dom.window.document.getElementById(rank);
        const chargeRadioButton = dom.window.document.getElementById(charge);
        const electedCheckBox = dom.window.document.getElementById("elected");
        const result = dom.window.document.getElementById('result');
        
        rankRadioButton.checked = true;
        chargeRadioButton.checked = true;
        electedCheckBox.checked = isElected;

        // クリック
        button.click();

        // 結果の取得
        expect(result.innerHTML).toContain(expectedResult);
  });

});
