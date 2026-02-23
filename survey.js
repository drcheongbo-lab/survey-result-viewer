const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

function loadResult() {
  const name = document.getElementById("resultName").value.trim();
  if (!name) {
    alert("이름을 입력해 주세요.");
    return;
  }

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      const section = document.getElementById("resultSection");
      const resultBox = document.getElementById("result");

      section.style.display = "block";

      if (data.error) {
        resultBox.innerHTML = `<p style="color:red;">${data.error}</p>`;
        return;
      }

      resultBox.innerHTML = `
        <h4>증상 변증 결과</h4>
        <p>${data.symptom || "결과 없음"}</p>

        <h4>심리 검사 결과</h4>
        <p>${data.psychology || "결과 없음"}</p>
      `;
    })
    .catch(() => {
      alert("결과를 불러오는 중 오류가 발생했습니다.");
    });
}
