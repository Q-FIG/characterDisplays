# characterDisplays
TRPGキャラクターのディスプレイサイト

## キャラクター情報の追加について
### info.json
jsonファイルにキャラクター情報を追加する。
以下、テンプレート

```json
[
  {
    "name": "キャラクター名　※必須",
    "subname": "キャラクター名の読み方",
    "image": "メインページに表示するキャラ画像.png",
    "faceImages": [
      {
        "name": "表情差分１",
        "image": "表情差分１.png",
        "emphasis": true
      }
    ],
    "styleImages": [
      {
        "name": "画像差分１",
        "image": "画像差分１.png",
        "emphasis": true
      }
    ],
    "color": "#000000",
    "system": "クトゥルフ神話TRPG 6th",
    "description": "キャラクターの説明。emphasisキーは、初期表示時に表示する情報を指定する事ができる。",
    "scenarios": [
      {
        "name": "シナリオの名前",
        "subname": "シナリオのサブタイトル",
        "description": "シナリオの情報",
        "ho": "ハンドアウト名",
        "hoDescription": "ハンドアウトの公開情報",
        "emphasis": true
      }
    ]
  }
]
```