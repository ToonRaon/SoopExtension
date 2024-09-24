const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    const titleElement = document.querySelector(".broadcast_title");
    const shareBox = document.querySelector(".share_box");
    const titleContainerElement = document.querySelector(".u_clip_title.type2");

    if (titleContainerElement) {
      titleContainerElement.style.right = '320px';
    }

    // 타이틀 복사 기능
    if (titleElement) {
      titleElement.style.cursor = "pointer";

      titleElement.addEventListener("click", () => {
        let textToCopy = titleElement.textContent.replace("[클립]", "").trim();

        navigator.clipboard.writeText(textToCopy).then(() => {
          titleElement.style.transition = "color 0.3s ease";
          titleElement.style.color = "#ff6347";

          setTimeout(() => {
            titleElement.style.color = "";
          }, 500);
        }).catch(err => {
          console.error("복사 실패:", err);
        });
      });
    }

    // 복사하기 버튼 추가 및 기능
    if (shareBox && !shareBox.querySelector(".btn_copy")) {
      const copyButton = document.createElement("button");
      copyButton.className = "btn_copy";
      copyButton.type = "button";
      copyButton.innerHTML = "<em></em><span>복사하기</span>";
      copyButton.style.marginLeft = "8px";

      copyButton.addEventListener("click", () => {
        const urlButton = document.querySelector(".url");

        if (urlButton) {
          urlButton.click();
        }
      });

      shareBox.appendChild(copyButton);
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
