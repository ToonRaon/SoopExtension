const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // 즐찾 사이드바
    const preferBjLinks = document.querySelectorAll(".side_list a");
    preferBjLinks.forEach((preferBjLink) => {
      let bjUrl = preferBjLink.getAttribute("href");

      bjUrl = bjUrl.replace("play.sooplive.co.kr", "ch.sooplive.co.kr"); // 생방 채널 예외 처리

      if (!preferBjLink.querySelector(".vod-button")) {
        const vodButton = createVodButton(bjUrl);
        const isLive = preferBjLink.querySelector(".views");
        vodButton.style.marginLeft = isLive ? "8px" : "auto";

        preferBjLink.appendChild(vodButton);
      }
    });

    // 정확히 스트리머 이름 검색시
    document.querySelectorAll('.profile_box:not(.vod_added)').forEach((element) => {
      element.classList.add('vod_added');

      const bjLink = element.querySelector('a.thumb').getAttribute('href');
      const nickDiv = element.querySelector('.nick');
      const vodButton = createVodButton(bjLink);
      vodButton.style.marginLeft = "8px";

      nickDiv.appendChild(vodButton);
    });

    // 비슷한 스트리머 이름으로 검색시
    document.querySelectorAll('.strm_box:not(.vod_added)').forEach((element) => {
      element.classList.add('vod_added');

      const bjLink = element.querySelector('a.thumb').getAttribute('href');
      const detailContainer = element.querySelector('.details');
      const vodButton = createVodButton(bjLink);
      vodButton.style.marginTop = "8px";
      vodButton.style.width = "100%";

      detailContainer.appendChild(vodButton);
    });
  });
});

const createVodButton = (bjLink) => {
  const vodButton = document.createElement("button");

  vodButton.textContent = "VOD";
  vodButton.className = "vod-button";
  vodButton.style.cursor = "pointer";
  vodButton.style.color = "#007bff";
  vodButton.style.background = "none";
  vodButton.style.border = "none";
  vodButton.style.padding = "0";
  vodButton.style.fontSize = "inherit";
  vodButton.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = bjLink.match(/https:\/\/.+?\/[^\/]+/)[0];
    window.open(`${url}/vods/review`, '_self');
  };

  return vodButton;
}

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
