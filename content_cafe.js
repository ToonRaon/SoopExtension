const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if(document.querySelector('.paste_button')) {
      return;
    }

    // 'tool_area'라는 클래스가 있는 div를 찾습니다
    const toolArea = document.querySelector('.tool_area');

    // '붙여넣기' 버튼을 생성합니다
    const pasteButton = document.createElement('div');
    pasteButton.classList.add('paste_button');
    pasteButton.textContent = '붙여넣기';

    // 버튼을 'tool_area' div 안에 있는 '.temp_save_area' 앞에 추가합니다
    const tempSaveArea = toolArea.querySelector('.temp_save_area');
    toolArea.insertBefore(pasteButton, tempSaveArea);

    pasteButton.addEventListener('click', async () => {
      // 클립보드에서 텍스트 가져오기
      const clipboardText = await navigator.clipboard.readText();
      alert(`asd ${clipboardText}`);

      // 문자열이 JSON 형태인지 확인하고 파싱하기
      let parsedData;
      try {
        parsedData = JSON.parse(clipboardText);
      } catch (e) {
        alert("클립보드에 올바른 형식의 JSON 데이터가 없습니다.");
        return;
      }

      if (parsedData.title && parsedData.clipUrl) {
        // title을 .text_input에 넣기
        const textInput = document.querySelector('.textarea_input');
        if (textInput) {
          textInput.value = parsedData.title;
        }

        // .se-components-wrap 안에서 두 번째에 만난 span에 clipUrl을 넣기
        const seComponentsWrap = document.querySelector('.se-components-wrap');
        if (seComponentsWrap) {
          const spans = seComponentsWrap.querySelectorAll('span');
          spans[0].textContent = parsedData.clipUrl;
        }
      } else {
        alert(`클립보드 데이터 형식이 올바르지 않습니다. ${clipboardText}`);
      }
    });
  });
});

observer.observe(document.body, { childList: true });