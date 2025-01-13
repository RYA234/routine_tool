# 概要


作成したプログラミングを動作確認するためのリポジトリ。
動作環境はブラウザのみです。



# 動作環境

名称|version|説明
---|--------|---
GoogleChrome|131.0.6778.86|ウェブブラウザ


# 開発環境
名称|version|説明
---|--------|---
Javascript|-|プログラミング言語
HTML|HTML Living Standard|GUI
Nodejs|22.9.0|単体テスト実行で使う
Jest|29.70|テストフレームワーク
jsdom|25.01|DOM操作のライブラリ　テストで使う
Github Codespaces|クラウドIDE

※実行に必要なライブラリはcdnで追加している。

# フォルダ構成
src フォルダ以下の記述内容

フォルダ名| 説明
---------|----
software_test|ソフトウェアテスト練習帳の学習結果
system_design_error|システム設計　エラー処理　排他制御について
03_hanbai|グラス片手にデータベース設計　販売管理システム編の学習結果

# 実行環境

ブラウザのみ


# コマンド類

```

docker-compose build

docker-compose up -d

docker-compose exec -it webserver bash

# テストフレームワークの実行
docker-compose exec -it webserver bash -c  "npm test"

# JSdocを生成
docker-compose exec -it webserver bash -c  "./node_modules/.bin/jsdoc ./"

```

 docker-compose exec app -it bash




# 参考


