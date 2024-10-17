let vodStartTime = undefined;
let timelineObserver = undefined;
let cursorObserver = undefined;

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (!document.querySelector('.realtime')) {
      addRealtimeElement();
    }

    if (!timelineObserver) {
      const currentTimeElement = document.querySelector(".time-current");
      const durationElement = document.querySelector(".time-duration");

      if (!currentTimeElement || !durationElement) {
        return;
      }

      timelineObserver = new MutationObserver(() => {
        addActualTime(currentTimeElement, vodStartTime);
        addActualTime(durationElement, vodStartTime);
      });

      timelineObserver.observe(currentTimeElement, { characterData: true, subtree: true, childList: true });
    }

    const cursorTimeElement = document.querySelector(".timeline_thumbnail span em");
    if (!cursorTimeElement) {
      cursorObserver?.disconnect();
      cursorObserver = undefined;
    }

    if (!cursorObserver) {
      if (cursorTimeElement) {
        cursorTimeElement.style.whiteSpace = "nowrap";

        cursorObserver = new MutationObserver(() => {
          addActualTime(cursorTimeElement, vodStartTime);
        });

        cursorObserver.observe(cursorTimeElement, { characterData: true, subtree: true, childList: true });
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

function addActualTime(element, startTime) {
  if (!startTime) {
    return;
  }

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

async function fetchVodStartTime() {
  const settingButton = document.querySelector('button.btn_setting');
  settingButton.click();

  await new Promise((resolve) => setTimeout(resolve, 200));

  const settingListButtons = document.querySelectorAll('.setting_list button');
  let broadcastInfoButton = undefined;
  for (let button of settingListButtons) {
    const span = button.querySelector('span');
    if (span && span.textContent.trim() === "방송 정보") {
      broadcastInfoButton = button;
      break;
    }
  }
  broadcastInfoButton?.click();

  await new Promise((resolve) => setTimeout(resolve, 200));

  const regDateElement = document.querySelector('.broadcast_info_layer dd');
  const regDate = regDateElement.textContent.split(' ~ ')[0];

  const settingBox = document.querySelector('.setting_box');
  settingBox.classList.remove('on');

  console.log(`hwang :: [fetchVodStartTime] regDate: ${regDate}`);

  vodStartTime = new Date(regDate);
}

function addRealtimeElement() {

  const dependItem = document.querySelector('.depend_item');
  const subscribeItemLi = document.querySelector('.subscribe');

  if (dependItem && subscribeItemLi) {
    const newButtonLi = document.createElement('li'); // 새로운 li 요소
    const newButton = document.createElement('button'); // 버튼 생성

    newButton.className = 'realtime'; // 클래스명 설정
    newButton.setAttribute('tip', '실제 시간 표시'); // tip 속성 설정
    newButton.type = 'button';
    newButton.innerText = '시간';
    newButton.style.color = '#007bff';
    newButton.addEventListener('click', () => {
      void fetchVodStartTime().then(() => {
        const currentTimeElement = document.querySelector(".time-current");
        const durationElement = document.querySelector(".time-duration");

        if (currentTimeElement && durationElement) {
          addActualTime(currentTimeElement, vodStartTime);
          addActualTime(durationElement, vodStartTime);
        }
      });
    });

    newButtonLi.appendChild(newButton); // 버튼을 li에 추가
    dependItem.insertBefore(newButtonLi, subscribeItemLi); // subscribe 앞에 li 삽입
  }
}