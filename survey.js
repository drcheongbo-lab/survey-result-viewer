const GAS_URL =
  "https://script.google.com/macros/s/❗여기에_네_배포_URL❗/exec";

/* ======================
   결과 조회
====================== */
function loadResult() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    alert("이름을 입력하세요.");
    return;
  }

  document.getElementById("resultSection").style.display = "block";
  document.getElementById("result").innerText = "결과를 불러오는 중입니다…";

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("result").innerText = data.error;
        return;
      }

      document.getElementById("result").innerHTML = `
        <p><strong>증상 변증 결과</strong><br>${data.symptom}</p>
        <hr>
        <p><strong>심리 검사 결과</strong><br>${data.psychology}</p>
      `;
    })
    .catch(() => {
      document.getElementById("result").innerText =
        "결과를 불러오는 중 오류가 발생했습니다.";
    });
}
