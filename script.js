// 구글 설문지 주소
const symptomFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdAHOgM2fYvcFpMp0Ryx7jF_aa2ACNAVxWUwj4l8-c5c0wCoQ/viewform";

const mindFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdino89hjtQN9_2QMKzirdguHN6-pSCNUhQ6nKDUHou5lqqGw/viewform";

// 증상 설문 열기
function openSymptomForm() {
  window.open(
    symptomFormURL,
    "_blank",
    "width=900,height=800"
  );
}

// 증상 설문 완료 확인
function confirmSymptomDone() {
  // 현실적인 방식: 사용자 확인
  const ok = confirm("증상 설문을 모두 제출하셨습니까?");
  if (!ok) return;

  document.getElementById("mindBtn").disabled = false;
  alert("심리 설문을 진행하실 수 있습니다.");
}

// 심리 설문 열기
function openMindForm() {
  window.open(
    mindFormURL,
    "_blank",
    "width=900,height=800"
  );
}
