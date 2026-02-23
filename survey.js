const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

function loadResult() {
  const name = document.getElementById("resultName").value.trim();
  const loading = document.getElementById("loadingText");
  const section = document.getElementById("resultSection");
  const symptomBox = document.getElementById("symptomResult");
  const psychologyBox = document.getElementById("psychologyResult");
  const btn = document.getElementById("resultBtn");

  if (!name) {
    alert("이름을 입력해 주세요.");
    return;
  }

  // UX 상태
  loading.style.display = "block";
  section.style.display = "none";
  btn.disabled = true;

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.text())   // 🔴 중요: text로 받기
    .then(text => {
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("JSON 파싱 실패: " + text);
      }

      loading.style.display = "none";
      btn.disabled = false;
      section.style.display = "block";

      if (data.error) {
        symptomBox.innerText = data.error;
        psychologyBox.innerText = "";
        return;
      }

      symptomBox.innerText = data.symptom || "결과 없음";
      psychologyBox.innerText = data.psychology || "결과 없음";
    })
    .catch(err => {
      loading.style.display = "none";
      btn.disabled = false;
      alert("결과 조회 중 오류가 발생했습니다.\n\n" + err.message);
      console.error(err);
    });
}
