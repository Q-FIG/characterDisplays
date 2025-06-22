# characterDisplays
TRPGキャラクターのディスプレイサイト

## キャラクター情報の追加について
### info.json
jsonファイルにキャラクター情報を追加する。
以下、テンプレート

```json
const info = [
  {
    "name": "キャラクター名　※必須",
    "url": "https://example.com/character-url", // キャラクターのURL
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
    "voices": [
      {
        "name": "ボイス１",
        "image": "ボイス１.png",
        "audio": "ボイス１.m4a", // ここに音声ファイル名を追加
        "emphasis": true
      }
    ],
    "color": "#ff0000", // キャラクターの縁取り色
    "background": "背景画像.png", // キャラクターの背景画像
    "backgroundColor": "#ffffff", // キャラクターの背景色
    "system": "クトゥルフ神話TRPG 6th",
    "status": [
      {
        "groupTitle": "ステータスグループ名",
        "info": [
          {"label": "STR", "value": 10, "max": 18},
          {"label": "CON", "value": 10, "max": 18},
          {"label": "POW", "value": 10, "max": 18},
          {"label": "DEX", "value": 10, "max": 18},
          {"label": "APP", "value": 10, "max": 18},
          {"label": "SIZ", "value": 10, "max": 18},
          {"label": "INT", "value": 10, "max": 18},
          {"label": "EDU", "value": 10, "max": 21},
        ],
        "style": "scaleBar"
      },
      {
        "info": [
          {"label": "HP", "value": 10},
          {"label": "MP", "value": 10},
          {"label": "SAN", "value": 50},
          {"label": "アイデア", "value": 50},
          {"label": "幸運", "value": 50},
          {"label": "知識", "value": 50},
        ],
        "style": "integer"
      },
      {
        "groupTitle": "技能値",
        "info": [
          {"label": "隠れる", "value": 20},
          {"label": "隠す", "value": 70},
          {"label": "芸術(必殺・かっこいいポーズ)", "value": 50},
        ],
        "style": "skill"
      },
    ],
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
];
```