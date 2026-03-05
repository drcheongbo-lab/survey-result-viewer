const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyKB7rvQlbFmJW9VuI0E2E_Thh7vsUR9gx_EZH6KRXwPbplWjFnTqycPStTt4UxIkaq/exec";

let pieChartInstance = null; // ✅ 차트 중복 방지용

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
  const symptomExplainBox = document.getElementById("symptomExplain");
  const psychologyBox = document.getElementById("psychologyResult");
  const btn = document.getElementById("resultBtn");

  // ✅ 초기화
  section.style.display = "none";
  symptomBox.textContent = "";
  psychologyBox.textContent = "";
  if (symptomExplainBox) symptomExplainBox.textContent = "";

  // 기존 차트 제거 (재조회 대비)
  if (pieChartInstance) {
    pieChartInstance.destroy();
    pieChartInstance = null;
  }

  // ✅ 로딩 시작
  loading.style.display = "block";
  btn.disabled = true;

  fetch(`${GAS_URL}?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      console.log("서버 응답:", data);
      loading.style.display = "none";
      btn.disabled = false;
      section.style.display = "block";

      if (data.error) {
        symptomBox.innerHTML = `<span style="color:red;">${data.error}</span>`;
        psychologyBox.innerHTML = "";
        if (symptomExplainBox) symptomExplainBox.innerHTML = "";
        return;
      }

      // ✅ 기존 기능 그대로 유지
      symptomBox.textContent =
        data.symptom || "증상 변증 결과가 없습니다.";

      if (symptomExplainBox) {
        symptomExplainBox.textContent =
          data.symptomExplain || "추가 설명이 없습니다.";
      }

      psychologyBox.textContent =
        data.psychology || "심리 검사 결과가 없습니다.";

      // ✅ pieData 있을 때만 원그래프 생성
      if (Array.isArray(data.pieData) && data.pieData.length > 0) {
        drawPieChart(data.pieData);
      }
    })
    .catch(err => {
      loading.style.display = "none";
      btn.disabled = false;
      alert("결과를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    });
}

/* ============================= */
/*        원그래프 생성 함수       */
/* ============================= */

function drawPieChart(values) {

  const canvas = document.getElementById("pieChart");
  if (!canvas || typeof Chart === "undefined") return; 
  // Chart.js 없으면 자동 종료 (오류 방지)

  const total = values.reduce((sum, v) => sum + Number(v || 0), 0);
  if (total === 0) return;

  pieChartInstance = new Chart(canvas, {
    type: "pie",
    data: {
      labels: ["회", "청", "적", "주황", "흑", "녹", "황"],
      datasets: [{
        data: values,
        backgroundColor: [
          "gray",     // 회
          "blue",     // 청
          "red",      // 적
          "orange",   // 주황
          "black",    // 흑
          "green",    // 녹
          "yellow"    // 황
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const percent = ((value / total) * 100).toFixed(1);
              return percent + "%";
            }
          }
        }
      }
    }
  });
}
