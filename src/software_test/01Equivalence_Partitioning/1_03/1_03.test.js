// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 1_03.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('畳計算_単体テスト', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/01Equivalence_Partitioning/1_03/1_03.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })

  test.each([
    ["-129","エラー  無効な値です。"],
    ["-128","エラー 畳数は１以上を入力してください"],
    ["0","エラー 畳数は１以上を入力してください"],
    ["10","16.5"],
    ["127","209.55"],
    ["128","エラー  無効な値です。"],
  ])('同値分割のテスト', async(inputValue,expected) => {
        // テキスト入力欄を取得し値を設定
        const textBox = dom.window.document.getElementById('tatami');
        textBox.value = inputValue;
        // // ボタン取得とクリック
        const button = dom.window.document.getElementById('run');
        await button.click();
        // 結果の取得
        const result = dom.window.document.getElementById('result');
        expect(result.innerHTML).toContain(expected);
  });


  test.each([
    ["","エラー 空欄か文字が入力されています。"],
    ["iiijjk","エラー 空欄か文字が入力されています。"],
    ["aaaa","エラー 空欄か文字が入力されています。"],
    ["500","無効な値です。"],
    ["-500","無効な値です。"],
    ["-55","畳数は１以上を入力してください"],
  ])('異常系テスト', async(inputValue,expected) => {
        // テキスト入力欄を取得し値を設定
        const textBox = dom.window.document.getElementById('tatami');
        textBox.value = inputValue;
        // // ボタン取得とクリック
        const button = dom.window.document.getElementById('run');
        await button.click();
        // 結果の取得
        const result = dom.window.document.getElementById('result');
        expect(result.innerHTML).toContain(expected);
  });

});
