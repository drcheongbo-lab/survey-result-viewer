const symptomFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdAHOgM2fYvcFpMp0Ryx7jF_aa2ACNAVxWUwj4l8-c5c0wCoQ/viewform?usp=header";
const mindFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdino89hjtQN9_2QMKzirdguHN6-pSCNUhQ6nKDUHou5lqqGw/viewform?usp=header";

const iframe = document.getElementById("questionnaireFrame");

/* 초기 로딩 */
window.onload = () => {
  iframe.src = symptomFormURL;
};

/* 탭 전환 */
function switchTab(type) {
  document.querySelectorAll(".tab-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  if (type === "symptom") {
    iframe.src = symptomFormURL;
    document.querySelector('[data-target="symptom"]').classList.add("active");
  }

  if (type === "mind") {
    iframe.src = mindFormURL;
    document.querySelector('[data-target="mind"]').classList.add("active");
  }
}

/* 다음 단계 */
function goNextStep() {
  const mindBtn = document.querySelector('[data-target="mind"]');
  mindBtn.disabled = false;
  mindBtn.classList.add("active");

  switchTab("mind");
}
