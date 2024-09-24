const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        const titleLinks = node.querySelectorAll(".vod-info .title a");
        const dateElements = node.querySelectorAll(".vod-info .date");

        titleLinks.forEach((titleLink) => {
          titleLink.addEventListener("click", (event) => {
            event.preventDefault();

            let titleText = titleLink.textContent.trim();
            if (titleText.startsWith("[클립]")) {
              titleText = titleText.replace("[클립]", "").trim();
            }

            navigator.clipboard.writeText(titleText).then(() => {
              titleLink.style.transition = "color 0.3s ease";
              titleLink.style.color = "#ff6347";

              setTimeout(() => {
                titleLink.style.color = "";
              }, 500);
            }).catch((err) => {
              console.error("복사 실패:", err);
            });
          });
        });

        dateElements.forEach((dateElement) => {
          if (!dateElement.nextElementSibling || dateElement.nextElementSibling.className !== 'link-btn') {
            const thumLink = dateElement.closest("li").querySelector(".thum a");
            const linkButton = document.createElement("span");

            linkButton.textContent = "링크 복사";
            linkButton.className = "link-btn";
            linkButton.style.cursor = "pointer";
            linkButton.style.marginLeft = "8px";
            linkButton.style.color = "#007bff";

            linkButton.addEventListener("click", () => {
              const clipUrl = thumLink.href;

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
