// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 2_04.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('2_04 魔王との戦い', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/02Decision_Table/2_04/2_04.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })


  const badResult1= "部屋を探し出せませんでした。";
  const badResult2= "部屋を探しだしました。しかし、鍵がないので部屋に入れません。";
  const badResult3= "部屋を探しだしました。そして、部屋に入れました。しかし、魔王を倒すには剣が必要です。";
  const bestResult= "部屋を探しだしました。そして、部屋に入れました。魔王を倒しました。";
  

  test.each([
    [false,false,false,false,badResult1],
    [false,false,true,false,badResult1],
    [false,false,false,true,badResult1],
    [false,false,true,true,badResult1],
    [true,false,false,true,badResult2],
    [true,false,false,false,badResult2],
    [false,true,false,false,badResult2],
    [false,true,false,true,badResult2],
    [true,true,false,true,badResult2],
    [true,true,false,false,badResult2],
    [true,true,true,false,badResult3],
    [false,true,true,false,badResult3],
    [true,false,true,false,badResult3],
    [true,true,true,true,bestResult],
    [true,false,true,true,bestResult],
    [false,true,true,true,bestResult],
  ])('２択^4（=16）のデシジョンテスト', async(isSage,isStaff,isKey,isSword,expectedResult) => {
        
       // テキスト入力欄を取得し値を設定
        const button = dom.window.document.getElementById('run');
        const sageCheckBox = dom.window.document.getElementById("sage");
        const staffCheckBox = dom.window.document.getElementById("staff");
        const keyCheckBox = dom.window.document.getElementById("key");
        const swordCheckBox = dom.window.document.getElementById("sword");
        const result = dom.window.document.getElementById('result');
        
        sageCheckBox.checked = isSage;
        staffCheckBox.checked = isStaff;
        keyCheckBox.checked = isKey;
        swordCheckBox.checked = isSword;

        // クリック
        button.click();

        // 結果の取得
        expect(result.innerHTML).toContain(expectedResult);
  });

});
