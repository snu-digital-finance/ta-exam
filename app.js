const INPUT_IDS = [
  "input-start-time",
  "input-end-time",
  "input-distribute-time",
  "input-num-questions",
  "input-place",
  "input-notes"
];

const INPUT_ELEMENTS = {};

function formatTime(value) {
  return value ? value.slice(0, 5) : "";
}

function calcDurationMinutes(start, end) {
  if (!start || !end) return "";
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  if (Number.isNaN(sh) || Number.isNaN(sm) || Number.isNaN(eh) || Number.isNaN(em)) return "";
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  return endMin - startMin > 0 ? endMin - startMin : "";
}

function setToday() {
  const today = new Date();
  const koDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  });

  const dateDisplay = document.getElementById("exam-date-display");
  const previewExamDate = document.getElementById("preview-exam-date");

  if (dateDisplay) dateDisplay.textContent = koDate;
  if (previewExamDate) previewExamDate.textContent = koDate;
}

function syncPreview() {
  const start = INPUT_ELEMENTS["input-start-time"]?.value;
  const end = INPUT_ELEMENTS["input-end-time"]?.value;
  const dist = INPUT_ELEMENTS["input-distribute-time"]?.value;
  const place = INPUT_ELEMENTS["input-place"]?.value || "";
  const notes = INPUT_ELEMENTS["input-notes"]?.value || "";
  const numQ = INPUT_ELEMENTS["input-num-questions"]?.value || "";

  const previewMap = {
    "preview-start-time": formatTime(start) || "—",
    "preview-end-time": formatTime(end) || "—",
    "preview-distribute-time": formatTime(dist) || "—",
    "preview-duration": calcDurationMinutes(start, end) || "—",
    "preview-num-questions": numQ || "—",
    "preview-place": place,
    "preview-notes": notes
  };

  Object.entries(previewMap).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });
}

function init() {
  INPUT_IDS.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      INPUT_ELEMENTS[id] = element;
      element.addEventListener("input", syncPreview);
    }
  });

  setToday();
  syncPreview();
}

document.addEventListener("DOMContentLoaded", init);
