const setElementAsCopyButton = (element, string) => {
  element.style.cursor = "pointer";
  element.addEventListener('click', (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(string).then(() => {
      element.style.transition = "color 0.3s ease";
      element.style.color = "#ff6347";

      setTimeout(() => {
        element.style.color = "";
      }, 500);
    }).catch(err => {
      console.error("복사 실패:", err);
    });
  });
}