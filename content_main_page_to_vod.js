const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const preferBjLinks = document.querySelectorAll(".side_list a");
    console.log(preferBjLinks.length);

    preferBjLinks.forEach((preferBjLink) => {
      let bjUrl = preferBjLink.getAttribute("href");

      bjUrl = bjUrl.replace("play.sooplive.co.kr", "ch.sooplive.co.kr"); // 생방 채널 예외 처리

      if (!preferBjLink.querySelector(".vod-button")) {
        const vodButton = document.createElement("button");
        const isLive = preferBjLink.querySelector(".views");
        vodButton.textContent = "VOD";
        vodButton.className = "vod-button";
        vodButton.style.marginLeft = isLive ? "8px" : "auto";
        vodButton.style.cursor = "pointer";
        vodButton.style.color = "#007bff";
        vodButton.style.background = "none";
        vodButton.style.border = "none";
        vodButton.style.padding = "0";
        vodButton.style.fontSize = "inherit";

        vodButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(`${bjUrl}/vods/review`, '_blank');
        };

        preferBjLink.appendChild(vodButton);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
