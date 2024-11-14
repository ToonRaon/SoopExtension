const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    const titleElement = document.querySelector(".broadcast_title");
    const shareBox = document.querySelector(".share_box");
    const titleContainerElement = document.querySelector(".u_clip_title.type2");
    const nickNameElement = document.querySelector(".nickname");

    if (titleContainerElement) {
      titleContainerElement.style.right = '320px';
    }

    // 타이틀 복사 기능
    if (titleElement) {
      titleElement.style.width = '350px';
      let textToCopy = titleElement.textContent.replace("[클립]", "").replace("[캐치]", "").trim();
      setElementAsCopyButton(titleElement, textToCopy);
    }

    // 카페 이동 버튼 추가
    if (!shareBox.querySelector(".btn_cafe")) {
      const cafeButton = createButton('카페', 'btn_cafe', () => {
        const urlButton = document.querySelector(".url");
        if (urlButton) {
          urlButton.click();

          setTimeout(() => {
            navigator.clipboard.readText().then((clipUrl) => {
              if (clipUrl) {
                const data = {
                  title: titleElement.textContent.replace("[클립]", "").replace("[캐치]", "").trim(),
                  clipUrl: clipUrl,
                  streamer: nickNameElement.textContent,
                };
                navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
                  const cafeUrl = `https://cafe.naver.com/ca-fe/cafes/30723072/menus/86/articles/write?boardType=L`;
                  window.close();
                  window.open(cafeUrl, "_blank").focus();
                });
              }
            })
          }, 500);
        }
      });
      shareBox.appendChild(cafeButton);
    }

    if (shareBox) {
      // 클립 URL 바로가기 버튼
      if (!shareBox.querySelector(".btn_quick")) {
        const quickButton = createButton('바로가기', 'btn_quick', () => {
          const urlButton = document.querySelector(".url");
          if (urlButton) {
            urlButton.click();

            setTimeout(() => {
              navigator.clipboard.readText().then((clipUrl) => {
                if (clipUrl) {
                  window.close();
                  window.open(clipUrl, "_blank").focus();
                }
              });
            }, 500);
          }
        });
        shareBox.appendChild(quickButton);
      }

      // 복사하기 버튼
      if (!shareBox.querySelector(".btn_copy")) {
        const copyButton = createButton('복사하기', 'btn_copy', () => {
          const urlButton = document.querySelector(".url");
          if (urlButton) {
            urlButton.click();
          }
        });
        shareBox.appendChild(copyButton);
      }

      // 공유하기 제거
      const shareButton = document.querySelector(".btn_share");
      if (shareButton) {
        shareButton.remove();
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const createButton = (text, className, onClick) => {
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `<span>${text}</span>`;
  button.className = className;
  button.style.justifyContent = 'flex-end';
  button.style.height = '44px';
  button.style.padding = '0 20px';
  button.style.marginLeft = '8px';
  button.style.verticalAlign = 'top';
  button.style.borderRadius = '10px';
  button.style.fontSize = '16px';
  button.style.border = '1px solid rgba(0, 0, 0, 0)';
  button.style.borderColor = '#d5d7dc';
  button.style.color = '#17191c';
  button.style.transition = 'all 0.2s ease-in-out';
  button.addEventListener('click', onClick);

  return button;
}