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
/* ======================
   설문 단계 전환 제어
====================== */
const symptomFormURL = "https://forms.gle/R3JidGJhV2Dvsy6Y8";
const mindFormURL = "https://forms.gle/R3BP9guu4xXhJzYi9";

function openSurveyModal() {
  document.getElementById("appointmentModal").style.display = "block";
  switchTab("symptom");
  lockMindTab(true);
}

function switchTab(type) {
  const iframe = document.getElementById("questionnaireFrame");
  document.querySelectorAll(".tab-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  if (type === "symptom") {
    iframe.src = symptomFormURL;
    document
      .querySelector('[data-target="symptom"]')
      .classList.add("active");
  }

  if (type === "mind") {
    iframe.src = mindFormURL;
    document
      .querySelector('[data-target="mind"]')
      .classList.add("active");
  }
}

function lockMindTab(lock) {
  const mindBtn = document.querySelector('[data-target="mind"]');
  if (!mindBtn) return;

  if (lock) {
    mindBtn.disabled = true;
    mindBtn.style.opacity = "0.4";
    mindBtn.style.cursor = "not-allowed";
  } else {
    mindBtn.disabled = false;
    mindBtn.style.opacity = "1";
    mindBtn.style.cursor = "pointer";
  }
}

function goNextStep() {
  lockMindTab(false);
  switchTab("mind");
}
