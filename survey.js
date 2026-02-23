const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

function loadResult() {
  const nameInput = document.getElementById("resultName");
  const name = nameInput.value.trim();
  const btn = document.getElementById("resultBtn");
  const loading = document.getElementById("loadingText");
  const section = document.getElementById("resultSection");

  if (!name) {
    alert("이름을 입력해 주세요.");
    return;
  }

  // UX 상태 변경
  btn.disabled = true;
  btn.innerText = "조회 중...";
  loading.style.display = "block";
  section.style.display = "none";

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      btn.disabled = false;
      btn.innerText = "결과 확인하기";
      section.style.display = "block";

      if (data.error) {
        document.getElementById("symptomResult").innerText = data.error;
        document.getElementById("psychologyResult").innerText = "";
        return;
      }

      document.getElementById("symptomResult").innerText =
        data.symptom || "결과 없음";

      document.getElementById("psychologyResult").innerText =
        data.psychology || "결과 없음";
    })
    .catch(() => {
      loading.style.display = "none";
      btn.disabled = false;
      btn.innerText = "결과 확인하기";
      alert("결과를 불러오는 중 오류가 발생했습니다.");
    });
}
