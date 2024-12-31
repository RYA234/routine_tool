// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 3_02.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('3_02 スマホ決済アプリの決済処理', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/03State/3_02/3_02.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })

  // テストコード
  test.each([
    ["操作待機","読取","読取待機"],
    ["読取待機","バーコード読取","金額確認"],
    ["読取待機","キャンセル","操作待機"],
    ["金額確認","キャンセル","操作待機"],
    ["金額確認","決済する","結果待ち"],
    ["結果待ち","成功","結果_成功"],
    ["結果待ち","失敗","結果_失敗"],
    ["結果_成功","OK","操作待機"],
    ["結果_失敗","OK","操作待機"],
    ["結果_失敗","再読取","読取待機"],
  ])('状態遷移テスト：', async(initialState,nextTrigger,nextExpectedState) => {
       // テキスト入力欄を取得し値を設定
        const runButton = dom.window.document.getElementById('run');
        const actionPullDown = dom.window.document.getElementById('action');
        const state = dom.window.document.getElementById("state");
        state.innerHTML = initialState;
        // 初期状態のStateを設定する
        actionPullDown.innerHTML = ""
        var option = dom.window.document.createElement('option');
        option.text=nextTrigger
        option.value=nextTrigger
        actionPullDown.appendChild(option);
        console.log(actionPullDown.value +"aa" + state.innerHTML);
        await runButton.click();
        expect(state.innerHTML).toContain(nextExpectedState);
  });
});
