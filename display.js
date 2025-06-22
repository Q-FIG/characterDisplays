/**
 * キャラクター名をURLのクエリパラメータ "name" から取得し、
 * 対応する info.json.js ファイルを読み込んで情報を取得する例
 */

// クエリパラメータからキャラクター名を取得
function getCharacterNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name');
}

// キャラクター情報を取得
async function fetchCharacterInfo(characterName) {
  try {
    const infoArray = info; // info.json.jsから直接取得
    if (!infoArray || !Array.isArray(infoArray)) {
      throw new Error('キャラクター情報が正しく読み込まれていません');
    }
    // name で一致するキャラクター情報を検索
    const characterInfo = infoArray.find(c => c.name === characterName);
    if (!characterInfo) {
      console.error('指定されたキャラクターが見つかりません:', characterName);
      return null;
    }
    return characterInfo;
  } catch (error) {
    console.error('キャラクター情報の取得に失敗しました:', error);
    return null;
  }
}

// 使用例
(async () => {
  const characterName = getCharacterNameFromUrl();
  if (!characterName) {
    console.error('キャラクター名がURLに指定されていません');
    return;
  }
  const info = await fetchCharacterInfo(characterName);
  if (info) {
    console.log('キャラクター情報:', info);
    // ここでinfoを使って表示などを行う
    renderCharacter(info);
  }
})();


function createImage(src, alt, isEmphasis) {
  const img = document.createElement('img');
  img.src = `./img/${src}`;
  img.alt = alt;
  if (isEmphasis) img.classList.add('emphasis');
  return img;
}

function renderCharacter(data) {
  const container = document.getElementById('characterDisplay');
  container.innerHTML = '';

  // 背景画像・背景色
  if (data.background || data.backgroundColor) {
    container.style.background = data.background
      ? `url(./img/${data.background}) center/cover no-repeat`
      : '';
    container.style.backgroundColor = data.backgroundColor || '';
  } else {
    container.style.background = '';
    container.style.backgroundColor = '';
  }

  // カラー
  const colorBar = document.createElement('div');
  colorBar.className = 'color-bar';
  colorBar.style.background = data.color || '#000';
  container.appendChild(colorBar);

  // 名前・サブネーム
  const name = document.createElement('h1');
  name.textContent = data.name;
  container.appendChild(name);

  if (data.subname) {
    const subname = document.createElement('div');
    subname.style.color = '#666';
    subname.style.marginBottom = '1em';
    subname.textContent = data.subname;
    container.appendChild(subname);
  }

  // メイン画像
  if (data.image) {
    const mainImg = document.createElement('img');
    mainImg.src = `./img/${data.image}`;
    mainImg.alt = data.name;
    mainImg.className = 'main-image';
    container.appendChild(mainImg);
  }

  // キャラクターURL
  if (data.url) {
    const urlDiv = document.createElement('div');
    urlDiv.className = 'character-url';
    const link = document.createElement('a');
    link.href = data.url;
    link.textContent = 'キャラクター詳細ページ';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    urlDiv.appendChild(link);
    container.appendChild(urlDiv);
  }
  
  // システム
  if (data.system) {
    const system = document.createElement('div');
    system.innerHTML = `<span class="label">システム:</span>${data.system}`;
    container.appendChild(system);
  }

  // 説明
  if (data.description) {
    const desc = document.createElement('div');
    desc.className = 'section';
    desc.innerHTML = `<span class="label">説明:</span>${data.description}`;
    container.appendChild(desc);
  }

  // 表情差分
  if (Array.isArray(data.faceImages) && data.faceImages.length > 0) {
    const faceSection = document.createElement('div');
    faceSection.className = 'section';
    faceSection.innerHTML = '<span class="label">表情差分:</span>';
    const faceImagesDiv = document.createElement('div');
    faceImagesDiv.className = 'face-images';
    data.faceImages.forEach(face => {
      const img = createImage(face.image, face.name, face.emphasis);
      img.title = face.name;
      faceImagesDiv.appendChild(img);
    });
    faceSection.appendChild(faceImagesDiv);
    container.appendChild(faceSection);
  }

  // 画像差分
  if (Array.isArray(data.styleImages) && data.styleImages.length > 0) {
    const styleSection = document.createElement('div');
    styleSection.className = 'section';
    styleSection.innerHTML = '<span class="label">画像差分:</span>';
    const styleImagesDiv = document.createElement('div');
    styleImagesDiv.className = 'style-images';
    data.styleImages.forEach(style => {
      const img = createImage(style.image, style.name, style.emphasis);
      img.title = style.name;
      styleImagesDiv.appendChild(img);
    });
    styleSection.appendChild(styleImagesDiv);
    container.appendChild(styleSection);
  }

  // ボイス
  if (Array.isArray(data.voices) && data.voices.length > 0) {
    const voiceSection = document.createElement('div');
    voiceSection.className = 'section';
    voiceSection.innerHTML = '<span class="label">ボイス:</span>';
    const voiceList = document.createElement('div');
    voiceList.className = 'voice-list';
    data.voices.forEach(voice => {
      const voiceDiv = document.createElement('div');
      voiceDiv.className = 'voice';
      if (voice.emphasis) voiceDiv.classList.add('emphasis');
      if (voice.image) {
        const img = createImage(voice.image, voice.name, voice.emphasis);
        img.title = voice.name;
        voiceDiv.appendChild(img);
      }
      if (voice.name) {
        const nameSpan = document.createElement('span');
        nameSpan.textContent = voice.name;
        nameSpan.className = 'voice-name';
        voiceDiv.appendChild(nameSpan);
      }
      if (voice.audio) {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = `./audio/${voice.audio}`;
        voiceDiv.appendChild(audio);
      }
      voiceList.appendChild(voiceDiv);
    });
    voiceSection.appendChild(voiceList);
    container.appendChild(voiceSection);
  }

  // ステータス
  if (Array.isArray(data.status) && data.status.length > 0) {
    const statusSection = document.createElement('div');
    statusSection.className = 'section';
    statusSection.innerHTML = '<span class="label">ステータス:</span>';

    data.status.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'status-group';

      if (group.groupTitle) {
        const groupTitle = document.createElement('div');
        groupTitle.className = 'status-group-title';
        groupTitle.textContent = group.groupTitle;
        groupDiv.appendChild(groupTitle);
      }

      if (Array.isArray(group.info)) {
        if (group.style === 'scaleBar') {
          const scaleBarList = document.createElement('div');
          scaleBarList.className = 'status-scale-bar-list';
          group.info.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'status-scale-bar-item';
            const label = document.createElement('span');
            label.className = 'status-label';
            label.textContent = item.label;
            const barContainer = document.createElement('span');
            barContainer.className = 'status-bar-container';
            const bar = document.createElement('span');
            bar.className = 'status-bar';
            const max = item.max || 18;
            bar.style.width = `${(item.value / max) * 100}%`;
            bar.textContent = item.value;
            barContainer.appendChild(bar);
            itemDiv.appendChild(label);
            itemDiv.appendChild(barContainer);
            groupDiv.appendChild(itemDiv);
          });
        } else if (group.style === 'integer') {
          const intList = document.createElement('div');
          intList.className = 'status-integer-list';
          group.info.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'status-integer-item';
            itemDiv.innerHTML = `<span class="status-label">${item.label}:</span> <span class="status-value">${item.value}</span>`;
            intList.appendChild(itemDiv);
          });
          groupDiv.appendChild(intList);
        } else if (group.style === 'skill') {
          const skillList = document.createElement('div');
          skillList.className = 'status-skill-list';
          group.info.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'status-skill-item';
            itemDiv.innerHTML = `<span class="status-label">${item.label}:</span> <span class="status-value">${item.value}</span>`;
            skillList.appendChild(itemDiv);
          });
          groupDiv.appendChild(skillList);
        }
      }
      statusSection.appendChild(groupDiv);
    });

    container.appendChild(statusSection);
  }

  // シナリオ
  if (Array.isArray(data.scenarios) && data.scenarios.length > 0) {
    const scenarioSection = document.createElement('div');
    scenarioSection.className = 'section';
    scenarioSection.innerHTML = '<span class="label">参加シナリオ:</span>';
    data.scenarios.forEach(scenario => {
      const scenarioDiv = document.createElement('div');
      scenarioDiv.className = 'scenario';
      if (scenario.emphasis) scenarioDiv.classList.add('emphasis');
      scenarioDiv.innerHTML = `
        <div><span class="label">名前:</span>${scenario.name}</div>
        ${scenario.subname ? `<div><span class="label">サブタイトル:</span>${scenario.subname}</div>` : ''}
        ${scenario.description ? `<div><span class="label">説明:</span>${scenario.description}</div>` : ''}
        ${scenario.ho ? `<div><span class="label">ハンドアウト:</span>${scenario.ho}</div>` : ''}
        ${scenario.hoDescription ? `<div><span class="label">ハンドアウト説明:</span>${scenario.hoDescription}</div>` : ''}
      `;
      scenarioSection.appendChild(scenarioDiv);
    });
    container.appendChild(scenarioSection);
  }
}

// renderCharacter(characterData);