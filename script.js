function loadResult() {
  const date = document.getElementById("date").value;
  const name = document.getElementById("name").value;

  if (!date || !name) {
    alert("날짜와 이름을 모두 입력해 주세요.");
    return;
  }

  const url =
    "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec" +
    `?date=${date}&name=${encodeURIComponent(name)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("result").innerHTML =
          `<p style="color:red;">${data.error}</p>`;
        return;
      }

      document.getElementById("result").innerHTML = `
        <h3>증상 변증 결과</h3>
        <p>${data.symptomResult || "결과 없음"}</p>

        <h3>심리 검사 결과</h3>
        <p>${data.psychologyResult || "결과 없음"}</p>
      `;
    })
    .catch(() => {
      alert("결과를 불러오는 중 오류가 발생했습니다.");
    });
}
