// Google Apps Script URL
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxU6GYREgD7dgXAmW7Jt2JUP9xbC5FbpYVWVBxTgFkaJSfsuZOTYAuL3bTA2Lax9Nof/exec";

// 증상 설문 완료 확인
function confirmSymptomDone() {
  alert("증상 설문이 제출 완료되었습니다.");
  document.getElementById("mindDoneBtn").disabled = false; // 심리 설문 버튼 활성화
  // 페이지 스크롤 이동
  document.getElementById("mindFrame").scrollIntoView({ behavior: "smooth" });
}

// 심리 설문 완료 확인
function confirmMindDone() {
  alert("심리 설문이 제출 완료되었습니다.");
  // 결과 영역 표시
  document.getElementById("resultSection").style.display = "block";
  document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
}

// 검사 결과 조회
function loadResult() {
  const name = prompt("검사 결과를 확인하려면 이름을 입력하세요:");
  if (!name) {
    alert("이름을 입력하지 않으면 결과를 확인할 수 없습니다.");
    return;
  }

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById("result");

      if (data.error) {
        resultDiv.innerHTML = `<p style="color:red">${data.error}</p>`;
        return;
      }

      resultDiv.innerHTML = `
        <p><strong>증상 변증</strong><br>${data.symptom}</p>
        <p><strong>심리 검사</strong><br>${data.psychology}</p>
      `;
    })
    .catch(() => {
      document.getElementById("result").innerHTML =
        "<p style='color:red'>결과 조회 중 오류가 발생했습니다.</p>";
    });
}
