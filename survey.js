const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

function loadResult() {
  const nameInput = document.getElementById("resultName");
  const name = nameInput.value.trim();

  const loading = document.getElementById("loadingMessage");
  const section = document.getElementById("resultSection");
  const resultBox = document.getElementById("result");

  if (!name) {
    alert("이름을 입력해 주세요.");
    nameInput.focus();
    return;
  }

  // UI 초기화
  section.style.display = "none";
  resultBox.innerHTML = "";
  loading.style.display = "block";

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      section.style.display = "block";

      if (data.error) {
        resultBox.innerHTML = `
          <p style="color:red; font-weight: bold;">
            ${data.error}
          </p>
        `;
        return;
      }

      resultBox.innerHTML = `
        <h4>증상 변증 결과</h4>
        <p>${data.symptom || "결과 없음"}</p>

        <hr>

        <h4>심리 검사 결과</h4>
        <p>${data.psychology || "결과 없음"}</p>
      `;
    })
    .catch(err => {
      loading.style.display = "none";
      alert("결과를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    });
}
