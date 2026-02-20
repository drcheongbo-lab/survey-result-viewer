const symptomFormURL = "https://forms.gle/R3JidGJhV2Dvsy6Y8";
const mindFormURL = "https://forms.gle/R3BP9guu4xXhJzYi9";

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
