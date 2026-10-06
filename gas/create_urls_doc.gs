/**
 * AI Company 全 Web サイト ＆ Web ツール 完全統括一覧
 * Google ドキュメント全自動作成 ＆ Google ドライブ共有フォルダー格納スクリプト
 */
function createAICompanyUrlsGoogleDoc() {
  const folderId = "1uH0IrxXi4Yd_3c1mvhLG_IKeHQgGf-ii"; // 共有フォルダーID
  const docTitle = "【公式】AI Company 全 Web サイト ＆ Web ツール 完全統括一覧";

  // ドキュメント作成
  const doc = DocumentApp.create(docTitle);
  const body = doc.getBody();

  // スタイル設定
  body.setMarginTop(36);
  body.setMarginBottom(36);
  body.setMarginLeft(36);
  body.setMarginRight(36);

  // タイトル
  const title = body.appendParagraph(docTitle);
  title.setHeading(DocumentApp.ParagraphHeading.TITLE);
  title.setForegroundColor("#1E3A8A");

  const meta = body.appendParagraph("作成責任者: コ・ユンジョン (EA秘書) | 更新日: " + Utilities.formatDate(new Date(), "JST", "yyyy年MM月dd日"));
  meta.setItalic(true);
  meta.setForegroundColor("#64748B");
  body.appendHorizontalRule();

  const data = [
    {
      category: "🏢 【カテゴリー①】経営・全社員組織図・武器庫 メインポータル",
      items: [
        {
          name: "1. AI Company Visual Portal（完全版 組織図・武器庫ポータル）",
          desc: "Dai CEO、BOARD役員8名、AI社員全49名（全50名）組織図、実務データマップ、全武器庫統合ポータル。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/index.html"
        },
        {
          name: "2. AI Company 統合ダッシュボード ＆ DCM SRP施策ポータル",
          desc: "10月 DCM SRP施策ガイド、店舗巡回マスタ入力ルール、KPI報奨金カード、統合ダッシュボード。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/index.html"
        }
      ]
    },
    {
      category: "📊 【カテゴリー②】店舗巡回本部 ＆ マスタミス検証 専用ポータル",
      items: [
        {
          name: "3. 店舗マスタミス自動カウント ＆ リアルタイムドラッグ＆ドロップWebポータル",
          desc: "エクセル・報告書のリアルタイムドラッグ＆ドロップ検証、店舗マスタミス自動カウント、アラート表示ポータル。",
          url: "https://daisuke2019-debug.github.io/master-miss-portal/"
        }
      ]
    },
    {
      category: "🛠️ 【カテゴリー③】実務・業務自動化 ツール群 (武器庫)",
      items: [
        {
          name: "4. プロ仕様 画像注釈 ＆ 手順書自動生成スタジオ",
          desc: "写真モザイク加工、手順書1枚画像自動生成、写真固定ロック機能。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/manual_annotator.html"
        },
        {
          name: "5. Galaxy POP Generator（POP自動生成ツール デモプレビュー）",
          desc: "Galaxy S26 / A57 等の店頭販促POP自動生成ツール。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/demo_preview.html"
        },
        {
          name: "6. BOARD役員会議 組織ツリービジュアル",
          desc: "BOARD役員8名とAI社員の連携ビジュアルツリーシート。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/board_tree_visual.html"
        },
        {
          name: "7. 取締役会 1枚サマリーシート",
          desc: "役員会議の要約・全成果物1枚閲覧シート。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/board_summary_singlepage.html"
        },
        {
          name: "8. note 初投稿 原稿プレビュー",
          desc: "まーけ編集長監修 note第1弾記事のWebプレビュー。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/note_first_post_preview.html"
        },
        {
          name: "9. チームボード note 連携プレビュー",
          desc: "チーム共有ボード・note連動機能のプレビュー。",
          url: "https://daisuke2019-debug.github.io/ai-company-portal/public_html/team_board_note_preview.html"
        }
      ]
    },
    {
      category: "🌐 【カテゴリー④】初期・静的Webサイト",
      items: [
        {
          name: "10. My Static Site（静的Webサイト）",
          desc: "初期構築テスト用 静的Webサイト。",
          url: "https://daisuke2019-debug.github.io/my-static-site/"
        }
      ]
    }
  ];

  data.forEach(function(cat) {
    const h2 = body.appendParagraph(cat.category);
    h2.setHeading(DocumentApp.ParagraphHeading.HEADING2);
    h2.setForegroundColor("#2563EB");

    cat.items.forEach(function(item) {
      const pName = body.appendParagraph(item.name);
      pName.setHeading(DocumentApp.ParagraphHeading.HEADING3);
      pName.setForegroundColor("#0F172A");

      const pDesc = body.appendParagraph("・概要: " + item.desc);
      pDesc.setForegroundColor("#334155");

      const pUrl = body.appendParagraph("・Web URL: " + item.url);
      pUrl.setLinkUrl(item.url);
      pUrl.setForegroundColor("#2563EB");
      pUrl.setUnderline(true);

      body.appendParagraph(""); // 空白行
    });
  });

  doc.saveAndClose();

  // 共有フォルダーへ移動
  try {
    const file = DriveApp.getFileById(doc.getId());
    const folder = DriveApp.getFolderById(folderId);
    file.moveTo(folder);
    Logger.log("ドキュメント作成成功！URL: " + doc.getUrl());
  } catch (e) {
    Logger.log("フォルダ移動エラー: " + e.toString() + " | ドキュメントURL: " + doc.getUrl());
  }
}
