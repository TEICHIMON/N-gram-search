# プログラム実行手順

## 1. 概要

本ファイルでは、前後端プロジェクトの実行に必要な情報と手順について説明します。本プロジェクトは、Vue 3 と Tailwind CSS を使用して構築されたフロントエンド部分と、Express.js を使用して構築されたバックエンド部分で構成されています。プロジェクトでは、単体テストに Jest を使用しています。

## 2. システム要件

- OS: 任意（最新バージョンの Windows、macOS、または Linux を推奨）
- プログラミング言語: JavaScript/TypeScript
- 依存ライブラリ:
    - Node.js（バージョン 18.x 以上）
    - npm（バージョン 8.x 以上）

## 3. インストール手順

### 3.1.1 リポジトリをローカルにクローンする（GitHub を使用する場合）:

```bash
git clone git@github.com:TEICHIMON/N-gram-search.git
```

### 3.1.2 解凍する（ZIP ファイルを使用する場合）:

ZIP ファイルをダウンロードし、解凍します。

### 3.2 プロジェクトディレクトリに移動:

```bash
cd N-gram-search
```

### 3.3 依存関係をインストール:

```bash
npm install
```

### 3.4 住所情報の CSV ファイルを正しいフォルダに配置:

GitHub からクローンしたリポジトリの場合、住所情報が含まれる CSV ファイルを **zenkoku.csv** にリネームし、**/backend/config/countryData/** ディレクトリに配置してください。

## 4. 実行手順

### 4.1 開発環境

### 4.1.1 バックエンドサーバーを起動:

プロジェクトのルートディレクトリで以下を実行：

```bash
npm run backend:start
```

注意：**初回起動で** `invertedIndex.json` **ファイルが構築されていない場合、自動的に構築されます。ファイルは backend/config/invertedIndex/ に保存されます。既に構築済みの場合やファイルが存在する場合は再構築されません。**

### 4.1.2 フロントエンド開発サーバーを起動:

プロジェクトのルートディレクトリで以下を実行：

```bash
npm run frontend:dev
```

### 4.1.3 検索語句を入力:

フロントエンドサーバーが起動したら、ブラウザで `http://localhost:8080` を開き、検索語句を入力して "Search" ボタンをクリック。

### 4.1.4 出力結果を確認:

ブラウザで検索結果のリストを確認。

### 4.2 本番環境

### 4.2.1 バックエンドサーバーを起動:

プロジェクトのルートディレクトリで以下を実行：

```bash
npm run backend:start
```

注意：**初回起動で** `invertedIndex.json` **ファイルが構築されていない場合、自動的に構築されます。ファイルは backend/config/invertedIndex/ に保存されます。既に構築済みの場合やファイルが存在する場合は再構築されません。**

### 4.2.2 フロントエンド開発環境のファイルを本番環境用にビルド:

プロジェクトのルートディレクトリで以下を実行：

```bash
npm run frontend:build
```

### 4.2.3 検索語句を入力:

フロントエンドサーバーが起動したら、ブラウザで `http://localhost:3000` を開き、検索語句を入力して "Search" ボタンをクリック。

### 4.2.4 出力結果を確認:

ブラウザで検索結果のリストを確認。

## 5. 例

### 入力:

検索入力欄に以下を入力：

```
東京都
```

### 出力:

検索結果は以下の列を含む表形式で表示されます：

- 郵便番号
- 都道府県
- 市区町村
- 町域
- 京都通り名
- 字丁目
- 事業所名
- 事業所住所

出力例：

```text
1 | 100-0001 | 東京都 | 千代田区 | 千代田 | - | - | - | -
2 | 100-0002 | 東京都 | 千代田区 | 皇居外苑 | - | - | - | -
...
```

## 6. テストの実行

プロジェクトのルートディレクトリで以下を実行：

```bash
npm run test
```

以上の手順に従うことで、プロジェクトを正常にインストール、実行、およびテストすることができます。ご不明な点がある場合は、プロジェクトの `README.md` ファイルを参照するか、開発者にお問い合わせください。
