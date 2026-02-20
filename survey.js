// 구글 설문지 주소
const symptomFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdAHOgM2fYvcFpMp0Ryx7jF_aa2ACNAVxWUwj4l8-c5c0wCoQ/viewform";

const mindFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdino89hjtQN9_2QMKzirdguHN6-pSCNUhQ6nKDUHou5lqqGw/viewform";

// 증상 설문 열기
function openSymptomForm() {
  localStorage.setItem("symptomDone", "false");
  localStorage.setItem("mindDone", "false");
  
  window.open(
    symptomFormURL,
    "_blank",
    "width=900,height=800"
  );
  alert("설문 제출 후 이 화면으로 돌아와 주세요.");
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
  localStorage.setItem("symptomDone", "true");
  window.open(
    mindFormURL,
    "_blank",
    "width=900,height=800"
  );
}

window.addEventListener("focus", () => {
  const symptomDone = localStorage.getItem("symptomDone");
  const mindDone = localStorage.getItem("mindDone");

  // 증상 설문 완료 → 심리 설문 버튼 활성화
  if (symptomDone === "true") {
    lockMindTab(false);
  }

  // 심리 설문까지 완료했다고 가정
  if (symptomDone === "true") {
    localStorage.setItem("mindDone", "true");

    document.getElementById("afterSurveyMsg").style.display = "block";
    document.getElementById("resultBtn").style.display = "inline-block";
  }
});
