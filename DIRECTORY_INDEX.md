# 🏢 AI Company フォルダ構造 ＆ 全ファイル完全ガイドインデックス

AI Companyの全エージェント（Antigravity、Gemini、専門AI社員全49名）およびDai CEOが、いつでも必要なファイル・ツール・報告書を100%正しく・迷わず引き出せるように体系化した完全ガイドです。

---

## 📂 フォルダ構成と役割一覧

| フォルダ名 | 内容・目的 | 主な担当エージェント | 格納されている主要ファイル・ツール |
| :--- | :--- | :--- | :--- |
| created_outputs/ | 今後AIが作成した成果物（PDF, 音声, 画像, レポート）を一括集約する統合フォルダ | 👔 BOARD全役員 / 全エージェント | 本日の全成果物 (PDF1枚シート, ツリー図PDF, ジミンちゃん音声, 映え背景画像等) |
| public_html/ | Webアプリケーション ＆ 実務ポータル(武器庫) | ⚙️ ヒダリ / キャンバ | index.html (メインポータル), manual_annotator.html (画像注釈＆手順書) |
| reports_and_masters/ | 店舗巡回報告書 ＆ 各種マスタ照合データ | 📊 オペラ / マスタチェッカー | store_reports/ (巡回報告テキスト), SRP施策_ヒアリング一覧_9月.pdf/xlsx |
| drafts/ | SNS投稿案・note記事・プレゼン原稿ドラフト | 📢 まーけ / トレンラ / Xライター | note_articles/ (note決定版原稿), X_posts/ |
| gas/ | Google Apps Script コード ＆ 自動化連携 | ⚡ イティ / テック | team_board/Code.gs (チーム共有ボードGASコード) |
| research_reports/ | AIトレンド・市場リサーチ報告書 | 🔍 トレン / アナリ | report_20260706_latest_ai_trends.md |
| recreation_and_pop/ | Galaxy POPツール ＆ 社内レクお題集 | 🎨 デザイ / ルカCPO | Galaxy_POP_Generator.zip, 雑談から仕事へ_レクお題100選.xlsx |
| samsung_plus_assets/ | Samsung Plus アプリ実効解析用キャプチャ | 📊 オペラ / マスタチェッカー | UIキャプチャ画像・解析用JSONデータ |
| archives/ | 過去バックアップ ＆ 旧HTMLアーカイブ | ⚖️ ガバナ | old_html_backups/ (旧index.html, 旧組織図等) |

---

## 🚀 主要 Web アプリケーション (武器庫) パス一覧

1. AI Company Visual Portal (メイン組織・武器庫ポータル)
   - 相対パス: public_html/index.html
   - 絶対パス: file:///c:/Users/marum/OneDrive/デスクトップ/AI%20Company/public_html/index.html
   - 概要: AI社員全49名(全50名)組織図、ツリー構造、実務データ連携マップ、武器庫、サブスク財務管理。

2. プロ仕様 画像注釈 ＆ 手順書自動生成スタジオ
   - 相対パス: public_html/manual_annotator.html
   - 絶対パス: file:///c:/Users/marum/OneDrive/デスクトップ/AI%20Company/public_html/manual_annotator.html
   - 概要: TV放送風モザイク(位置完全合致)、写真固定ロック🔒、手順書(縦1列/横2列/3列)1枚画像合成。

---

## 🛠️ ワンクリック起動バッチファイル (.bat) 一覧

ルート直下に配置されたバッチファイルから、ワンクリックで各種自動化システムを起動できます：

- スマホ接続用サーバー起動.bat : スマホからPOP生成ツールやポータルにアクセスするためのローカルサーバー起動
- 店舗巡回報告書を作成する.bat : 最新の店舗巡回報告書を全自動生成・出力
- マニュアル画像を更新する.bat : POP操作マニュアル用画像を差替え・自動埋め込み
- AICoにURLを送信.bat : AI CompanyへURL情報を一括送信用スクリプト
- インターネット上に公開する.bat : 外部公開用サーバー準備ツール

---

## 💡 エージェント向けファイル参照ルール

1. Webアプリケーションやポータルを修正・呼び出す場合は、必ず public_html/ 配下のファイルを参照してください。
2. 店舗巡回報告書やマスタデータを参照する場合は、reports_and_masters/ フォルダ内を探索してください。
3. note原稿やX投稿文面を参照する場合は、drafts/ フォルダ内を参照してください。
