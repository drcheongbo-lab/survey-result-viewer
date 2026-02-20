// 반드시 embed URL 사용
const symptomFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdAHOgM2fYvcFpMp0Ryx7jF_aa2ACNAVxWUwj4l8-c5c0wCoQ/viewform?embedded=true";

const mindFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdino89hjtQN9_2QMKzirdguHN6-pSCNUhQ6nKDUHou5lqqGw/viewform?embedded=true";

window.addEventListener("DOMContentLoaded", () => {
  // 페이지 열리자마자 증상 설문 로드
  switchTab("symptom");
  lockMindTab(true);
});

function switchTab(type) {
  const iframe = document.getElementById("questionnaireFrame");

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

function lockMindTab(lock) {
  const btn = document.querySelector('[data-target="mind"]');
  btn.disabled = lock;
}

function goNextStep() {
  lockMindTab(false);
  switchTab("mind");
}
