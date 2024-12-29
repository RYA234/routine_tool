// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 1_07.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('1_07 武器の強化判定', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/01Equivalence_Partitioning/1_07/1_07.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })

  test.each([
    ["hinoki",1,"結果:強化限界です。"],
    ["kusanagi",1,"結果:強化しました。"],
    ["kusanagi",2,"結果:強化限界です"],
  ])('単体テスト"', async(actualWeapon,clickCount,expectedResult) => {
        
       // テキスト入力欄を取得し値を設定
        const button = dom.window.document.getElementById('run');
        const selectedWeapon = dom.window.document.getElementById(actualWeapon);
        const message_area = dom.window.document.getElementById('message_area');
        selectedWeapon.checked = true;
        
        // クリック
        for(let i=0;i < clickCount; i++){
          await button.click();
        }
        
        // 結果の取得
        expect(message_area.innerHTML).toContain(expectedResult);
  });

});
