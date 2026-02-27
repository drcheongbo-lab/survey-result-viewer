const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyJFi2UvlLbMtyfjwhU8wGWuC1s9YvHAip5c37f_lNc6DfX2WKMXLmiE-LCjEl0Cli8/exec";

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
  const symptomExplainBox = document.getElementById("symptomExplain"); // ✅ 추가
  const psychologyBox = document.getElementById("psychologyResult");
  const btn = document.getElementById("resultBtn");

  // 초기화
  section.style.display = "none";
  symptomBox.textContent = "";
  psychologyBox.textContent = "";
  if (symptomExplainBox) symptomExplainBox.textContent = "";

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
        if (symptomExplainBox) symptomExplainBox.innerHTML = "";
        return;
      }

      // ✅ CF (기존 그대로)
      symptomBox.textContent =
        data.symptom || "증상 변증 결과가 없습니다.";

      // ✅ EH (있을 때만 표시)
      if (symptomExplainBox) {
        symptomExplainBox.textContent =
          data.symptomExplain || "추가 설명이 없습니다.";
      }

      // 심리 결과 (기존 그대로)
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
