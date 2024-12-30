// import {fromFile} from '@testing-library/jsdom';
import { test } from '@jest/globals';
import fs from "fs/promises";
import { JSDOM } from "jsdom";
// 実行コマンド
// docker-compose exec -it webserver bash -c  "npm test 3_01.test.js"
// 参考にしたやつ
// https://symfoware.blog.fc2.com/blog-entry-2685.html

;
describe('3_01 ストップウォッチの動作', () => {

  let html="";
  let dom = ""
  beforeEach(async() => {
    html = await fs.readFile("software_test/03State/3_01/3_01.html")
    dom =  new JSDOM(html,{runScripts: "dangerously"});
    dom.window.onload();
  })


  // State名
  const prepareState = "準備中";
  const runningState = "計測中";
  const stopState = "一時停止";
  // trigger
  const pressStart = 0
  const pressReset = 1
  // expectedResult
  const prepareResult = "準備中"
  const runningResult = "計測中"
  const stopResult = "一時停止"

  // テストコード
  test.each([
    [prepareState,pressStart,runningResult],
    [prepareState,pressReset,prepareResult],
    [runningState,pressStart,stopResult],
    [runningState,pressReset,prepareResult],
    [stopState,pressStart,runningResult],
    [stopState,pressReset,prepareResult],
  ])('状態遷移テスト：　状態=3 トリガー=2の６通りのテストケース', async(initialState,nextTrigger,expectedResult) => {
        
       // テキスト入力欄を取得し値を設定
        const startButton = dom.window.document.getElementById('start_or_stop');
        const elapsed_time = dom.window.document.getElementById("elapsed_time");
        const resetButton = dom.window.document.getElementById("reset");
        const state = dom.window.document.getElementById("state");
        
        // 初期状態のStateを設定する
        // そもそもこの時点で結果が正しい必要がある？？
        if(initialState == runningState){
          await startButton.click();
          expect(state.innerHTML).toContain(runningState);
        }
        if(initialState == stopState){
          await startButton.click();
          await startButton.click();
          expect(state.innerHTML).toContain(stopState);
        }
        // トリガーの処理を含める。
        if(nextTrigger == pressStart){
          await startButton.click();
        }
        if(nextTrigger == pressReset){
          await resetButton.click();
        }
        // expect
        expect(state.innerHTML).toContain(expectedResult);
  });
});
