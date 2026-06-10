# BUNCHIN LP — デプロイ一式

クラウドファンディング予定時のティザーLP（テスター募集 / 事前登録）。
静的サイトです。ビルド工程は不要 — このフォルダをそのまま公開できます。

## 公開手順（Cloudflare Pages）

1. このフォルダ（`site/` の中身）を GitHub リポジトリのルートに置いて push。
2. Cloudflare Pages → Create project → 当該リポジトリを接続。
3. ビルド設定：
   - **Framework preset**: `None`
   - **Build command**: （空欄）
   - **Build output directory**: `/`（リポジトリ直下に置いた場合）
4. Deploy。`index.html` がそのままトップページになります。

> リポジトリのサブフォルダに置く場合は、Build output directory をそのフォルダ名に。

## 公開前に必ず差し替えるもの

応募・通知ボタンのリンク先は**プレースホルダー**です。
`components/lp_shared.jsx` の先頭：

```js
const FORM_TESTER = "https://forms.gle/REPLACE-tester";  // ← テスター応募フォームのURL
const FORM_NOTIFY = "https://forms.gle/REPLACE-notify";  // ← 開発通知（事前登録）フォームのURL
```

を、実際の Google フォーム等の URL に書き換えてください（計2か所）。

## 構成

```
index.html              … エントリ（全セクションを組み上げ）
colors_and_type.css     … デザイントークン（色・タイポ・余白）＋ @font-face
tweaks-panel.jsx        … Tweaks パネル（デバイス表示の切替など）
components/
  bunchin_sound.jsx     … 音声マネージャ（SE＋合成音声）＋ SOUND トグル
  PixelFace.jsx         … ピクセルフェイス（デバイス画面の表情）
  lp_shared.jsx         … 共通プリミティブ＋CTA＋フォームURL
  lp_top.jsx            … ヒーロー / 課題 / BUNCHINとは
  lp_system.jsx         … BUNCHINという名前（文鎮＋7要素）
  lp_demo.jsx           … ヒーロー内の簡易デモ（声かけ→集中→振り返り）
  lp_mid.jsx            … 使い方 / 対象 / 違い
  lp_end.jsx            … 実機 / 開発状況 / テスター募集 / FAQ / 最終CTA
fonts/                  … GenEiMGothic2（3ウェイト）＋ DenkiChip
assets/
  BUNCHIN-device.png    … 実機写真
  audio/                … SE・合成音声（13ファイル）
```

## 動作メモ

- React / Babel / Google Fonts(JetBrains Mono) を CDN から読み込みます（公開後はインターネット接続で自動取得）。
- JSX はブラウザ内 Babel でトランスパイルしています。そのまま動きますが、表示を最速化したい場合は事前コンパイルも可能です。
- **音は完全オプトイン**：読み込み・スクロールでは鳴りません。ヒーローの「SOUND ON」を押した時だけ、SEと合成音声が再生されます。
- 字幕テキストはデザインシステムのデモ台詞です。実際の音声ファイルの読み上げ内容と差があれば `components/lp_demo.jsx` の文面を合わせ込んでください。
