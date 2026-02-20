const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

/* ======================
   설문 제출
====================== */
function submitSurvey() {
  const name = document.getElementById("name").value.trim();
  if (!name) {
    alert("이름을 입력하세요");
    return;
  }

  const symptoms = [...document.querySelectorAll(".symptom:checked")]
    .map(el => el.value);

  const mind = document.querySelector('input[name="mind"]:checked')?.value || "";

  fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      symptoms,
      mind
    })
  })
    .then(res => res.json())
    .then(() => alert("설문이 저장되었습니다"))
    .catch(() => alert("전송 오류"));
}

/* ======================
   결과 조회
====================== */
function loadResult() {
  const name = document.getElementById("name").value.trim();
  if (!name) {
    alert("이름을 입력하세요");
    return;
  }

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("result").innerText = data.error;
        return;
      }

      document.getElementById("result").innerHTML = `
        <p>증상 결과: ${data.symptom}</p>
        <p>심리 결과: ${data.psychology}</p>
      `;
    });
}
