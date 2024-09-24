let isDone = false;
let lastUrl = location.href;

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    const viewerCountElement = document.querySelector(".broadcast_viewer_cnt");

    if (viewerCountElement && !isDone) {
      const infoButton = document.querySelector(".vod_info_add");

      if (infoButton) {
        isDone = true;
        observer.disconnect();

        infoButton.click();

        setTimeout(() => {
          const dateElement = document.querySelector("#vodDetailView li:first-child span");

          if (dateElement) {
            const dateText = dateElement.textContent;
            const uploadDate = dateText.split(' ')[0];
            const isVod = dateText.includes("~");
            const [startTime, endTime] = dateText.split(" ~ ");

            const existingDiv = document.querySelector("#updateDate");
            if (existingDiv) {
              existingDiv.remove();
            }

            const newDiv = document.createElement("div");
            newDiv.id = "updateDate";
            newDiv.style.display = "inline-block";
            newDiv.style.marginLeft = "8px";
            newDiv.style.cursor = "pointer";
            newDiv.textContent = uploadDate;

            newDiv.addEventListener("click", () => {
              navigator.clipboard.writeText(uploadDate).then(() => {
                newDiv.style.transition = "color 0.3s ease";
                newDiv.style.color = "#ff6347";

                setTimeout(() => {
                  newDiv.style.color = "";
                }, 500);
              }).catch(err => {
                console.error("복사 실패:", err);
              });
            });

            if (isVod) {
              const vodStartTime = new Date(startTime);
              const currentTimeElement = document.querySelector(".time-current");
              const durationElement = document.querySelector(".time-duration");
              const cursorTimeElement = document.querySelector(".timeline_thumbnail span em");

              const timeObserver = new MutationObserver(() => {
                if (currentTimeElement) {
                  addActualTime(currentTimeElement, vodStartTime);
                }
                if (cursorTimeElement) {
                  console.log(cursorTimeElement.textContent);
                  addActualTime(cursorTimeElement, vodStartTime);
                }
              });

              addActualTime(currentTimeElement, vodStartTime);
              addActualTime(durationElement, vodStartTime);
              addActualTime(cursorTimeElement, vodStartTime);

              if (currentTimeElement) {
                timeObserver.observe(currentTimeElement, { characterData: true, childList: true, subtree: true });
              }

              if (cursorTimeElement) {
                timeObserver.observe(cursorTimeElement, { characterData: true, childList: true, subtree: true });
              }
            }

            viewerCountElement.parentNode.insertBefore(newDiv, viewerCountElement.nextSibling);
          }

          observer.observe(document.body, { childList: true, subtree: true });
        }, 500);
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    isDone = false;
    const existingDiv = document.querySelector("#updateDate");
    if (existingDiv) {
      existingDiv.remove();
    }
  }
}, 1000);

function addActualTime(element, startTime) {
  const originalTime = element.textContent;
  if (!originalTime.includes("(")) {
    const [hours, minutes, seconds] = originalTime.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const actualTime = new Date(startTime.getTime() + totalSeconds * 1000);

    const hoursStr = String(actualTime.getHours()).padStart(2, "0");
    const minutesStr = String(actualTime.getMinutes()).padStart(2, "0");
    const secondsStr = String(actualTime.getSeconds()).padStart(2, "0");

    element.textContent = `${originalTime} (${hoursStr}:${minutesStr}:${secondsStr})`;
  }
}
