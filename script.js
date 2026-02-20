const symptomFormURL = "https://forms.gle/https://docs.google.com/forms/d/e/1FAIpQLSdAHOgM2fYvcFpMp0Ryx7jF_aa2ACNAVxWUwj4l8-c5c0wCoQ/viewform?usp=header";
const mindFormURL = "https://forms.gle/https://docs.google.com/forms/d/e/1FAIpQLSdino89hjtQN9_2QMKzirdguHN6-pSCNUhQ6nKDUHou5lqqGw/viewform?usp=header";

let symptomDone = false;

function openSymptomForm() {
  window.open(symptomFormURL, "_blank");

  // UX상 “완료했다고 가정”하고 다음 버튼 활성
  symptomDone = true;

  document.getElementById("mindTab").disabled = false;
  document.getElementById("stepDescription").innerText =
    "증상 설문이 완료되었습니다. 다음으로 심리 설문을 진행해주세요.";
}

function openMindForm() {
  if (!symptomDone) return;

  window.open(mindFormURL, "_blank");
}


