import { beforeEach, expect, test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test simple_error_01.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('test11', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("system_design_error/01_simple_error/simple_error.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();

  })


  test.each([
    ["","空欄、数値以外が入力されています。"],
    ["111","数値は0以上100未満です。"],
    ["100","数値は0以上100未満です。"],
    ["10","問題無し。"],  
    ["0","問題無し。"],
    ["99","問題無し。"],  
  ])('数字単項目テスト"', async(actualNumber,expected) => {
        // テキスト入力欄を取得し値を設定
        const number = dom.window.document.getElementById('number');
        number.value =  actualNumber;
        // ボタン取得とクリック
        const button = dom.window.document.getElementById('checkbutton');
        await button.click();
        // 結果の取得
        const result = dom.window.document.getElementById('result');

        expect(result.innerHTML).toContain(expected);
  });
});
