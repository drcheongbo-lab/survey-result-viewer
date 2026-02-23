const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

function loadResult() {
  const nameInput = document.getElementById("resultName");
  const name = nameInput.value.trim();

  if (!name) {
    alert("이름을 입력해 주세요.");
    nameInput.focus();
    return;
  }

  const loading = document.getElementById("loadingText");
  const section = document.getElementById("resultSection");
  const symptomBox = document.getElementById("symptomResult");
  const psychologyBox = document.getElementById("psychologyResult");
  const btn = document.getElementById("resultBtn");

  // 초기화
  section.style.display = "none";
  symptomBox.textContent = "";
  psychologyBox.textContent = "";

  // 로딩 시작
  loading.style.display = "block";
  btn.disabled = true;

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      btn.disabled = false;
      section.style.display = "block";

      if (data.error) {
        symptomBox.innerHTML = `<span style="color:red;">${data.error}</span>`;
        psychologyBox.innerHTML = "";
        return;
      }

      symptomBox.textContent =
        data.symptom || "증상 변증 결과가 없습니다.";

      psychologyBox.textContent =
        data.psychology || "심리 검사 결과가 없습니다.";
    })
    .catch(err => {
      loading.style.display = "none";
      btn.disabled = false;
      alert("결과를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    });
}
