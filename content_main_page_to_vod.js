const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const preferBjLinks = document.querySelectorAll(".prefer_bj a");
    console.log(preferBjLinks.length);

    preferBjLinks.forEach((preferBjLink) => {
      let bjUrl = preferBjLink.getAttribute("href");

      bjUrl = bjUrl.replace("play.afreecatv.com", "bj.afreecatv.com"); // 생방 채널 예외 처리

      if (!preferBjLink.querySelector(".vod-button")) {
        const vodButton = document.createElement("button");
        vodButton.textContent = "VOD";
        vodButton.className = "vod-button";
        vodButton.style.marginLeft = "8px";
        vodButton.style.cursor = "pointer";
        vodButton.style.color = "#007bff";
        vodButton.style.background = "none";
        vodButton.style.border = "none";
        vodButton.style.padding = "0";
        vodButton.style.fontSize = "inherit";

        vodButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(`${bjUrl}/vods`, '_blank');
        };

        const pTag = preferBjLink.querySelector("p");
        if (pTag) {
          pTag.parentNode.insertBefore(vodButton, pTag.nextSibling);
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
