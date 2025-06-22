// index.js

// info.jsonからキャラクター情報を取得し、#character-listに表示する
document.addEventListener('DOMContentLoaded', async () => {
  const characterList = document.getElementById('character-list');

  try {
    // info.jsonを取得
    // const response = await fetch('./info.json.js');
    // const characters = await response.json();
    const characters = info; // info.json.jsから直接取得

    // キャラクターごとにコンポーネントを作成
    characters.forEach(character => {
      // キャラクターコンテナ
      const charDiv = document.createElement('div');
      charDiv.className = 'character-component';
      charDiv.style.cursor = 'pointer';
      // colorプロパティで縁取り
      if (character.color) {
        charDiv.style.border = `3px solid ${character.color}`;
      }

      // 画像
      const img = document.createElement('img');
      img.src = `./img/${character.image}`;
      img.alt = character.name;
      img.style.width = '120px';
      img.style.height = '120px';

      // 名前
      const name = document.createElement('div');
      name.textContent = character.name;
      name.className = 'character-name';

      // クリックでページ遷移
      charDiv.addEventListener('click', () => {
        window.location.href = `./display.html?name=${encodeURIComponent(character.name)}`;
      });

      charDiv.appendChild(img);
      charDiv.appendChild(name);
      characterList.appendChild(charDiv);
    });
  } catch (error) {
    characterList.textContent = 'キャラクター情報の取得に失敗しました。';
    console.error(error);
  }
});