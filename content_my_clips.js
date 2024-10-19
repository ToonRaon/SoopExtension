const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 만약에 현재 url이 https://bj.afreecatv.com/toonraon/vods/catch가 아니면
        let titleLinks;
        if (location.href.includes("/vods/catch")) {
          titleLinks = node.querySelectorAll(".vod-info .title");
        } else {
          titleLinks = node.querySelectorAll(".vod-info .title a");
        }

        const dateElements = node.querySelectorAll(".vod-info .date");

        titleLinks.forEach((titleLink) => {
          let titleText = titleLink.textContent.replace("[클립]", "").replace("[캐치]", "").trim();
          setElementAsCopyButton(titleLink, titleText);
        });

        dateElements.forEach((dateElement) => {
          if (!dateElement.nextElementSibling || dateElement.nextElementSibling.className !== 'link-btn') {
            let thumbnailLink;
            if (location.href.includes("/vods/catch")) {
              thumbnailLink = dateElement.closest("li").querySelector(".thum").closest("a");
            } else {
              thumbnailLink = dateElement.closest("li").querySelector(".thum a");
            }
            const linkButton = document.createElement("span");

            linkButton.textContent = "링크 복사";
            linkButton.className = "link-btn";
            linkButton.style.cursor = "pointer";
            linkButton.style.marginLeft = "8px";
            linkButton.style.color = "#007bff";

            linkButton.addEventListener("click", () => {
              const clipUrl = thumbnailLink.href;

              navigator.clipboard.writeText(clipUrl).then(() => {
                linkButton.style.transition = "color 0.3s ease";
                linkButton.style.color = "#ff6347";

                setTimeout(() => {
                  linkButton.style.color = "#007bff";
                }, 500);
              }).catch((err) => {
                console.error("복사 실패:", err);
              });
            });

            dateElement.parentNode.insertBefore(linkButton, dateElement.nextSibling);
          }
        });
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
