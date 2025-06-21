let cards = [];
let current = 0;
let flipped = false;

function loadCards() {
  const data = localStorage.getItem("dsa_flashcards");
  if (data) {
    cards = JSON.parse(data);
    showCard(current);
  }
}

function saveCards() {
  localStorage.setItem("dsa_flashcards", JSON.stringify(cards));
}

function addCard() {
  const q = document.getElementById("questionInput").value.trim();
  const a = document.getElementById("answerInput").value.trim();
  const tag = document.getElementById("tagInput").value.trim();

  if (q && a) {
    cards.push({
      question: q,
      answer: a,
      tag: tag || "Untagged",
      status: "Needs Work"
    });

    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    document.getElementById("tagInput").value = "";

    saveCards();
    showCard(cards.length - 1);
  } else {
    alert("Please enter both question and answer.");
  }
}

function showCard(index) {
  if (cards.length === 0) {
    document.getElementById("cardQuestion").textContent = "No cards yet.";
    document.getElementById("cardAnswer").textContent = "Click to flip";
    document.getElementById("cardTag").textContent = "";
    return;
  }

  const card = cards[index];
  const answerDiv = document.getElementById("cardAnswer");

  document.getElementById("cardQuestion").textContent = `Q${index + 1}: ${card.question}`;
  answerDiv.innerHTML = "";

  const lines = card.answer.split("\n");
  lines.forEach(line => {
    const lineDiv = document.createElement("div");
    lineDiv.textContent = line;
    answerDiv.appendChild(lineDiv);
  });

  const statusDiv = document.createElement("div");
  statusDiv.textContent = `\ud83d\udccc ${card.status}`;
  statusDiv.style.marginTop = "10px";
  statusDiv.style.color = "#7ed6df";
  answerDiv.appendChild(statusDiv);

  document.getElementById("cardTag").textContent = `#${card.tag}`;
  document.getElementById("flashcard").classList.remove("flipped");
  flipped = false;
}

function flipCard() {
  flipped = !flipped;
  document.getElementById("flashcard").classList.toggle("flipped", flipped);
}

function nextCard() {
  if (cards.length === 0) return;
  current = (current + 1) % cards.length;
  showCard(current);
}

function prevCard() {
  if (cards.length === 0) return;
  current = (current - 1 + cards.length) % cards.length;
  showCard(current);
}

function markPracticed() {
  if (cards.length === 0) return;
  cards[current].status = "Practiced";
  saveCards();
  showCard(current);
}

function markNeedsWork() {
  if (cards.length === 0) return;
  cards[current].status = "Needs Work";
  saveCards();
  showCard(current);
}

function clearAll() {
  if (confirm("Are you sure you want to delete all flashcards?")) {
    cards = [];
    localStorage.removeItem("dsa_flashcards");

    document.getElementById("cardQuestion").textContent = "No cards yet.";
    document.getElementById("cardAnswer").textContent = "Click to flip";
    document.getElementById("cardTag").textContent = "";
    document.getElementById("flashcard").classList.remove("flipped");
    flipped = false;
  }
}

function editCard() {
  if (cards.length === 0) return;
  const card = cards[current];
  document.getElementById("questionInput").value = card.question;
  document.getElementById("answerInput").value = card.answer;
  document.getElementById("tagInput").value = card.tag;

  const form = document.querySelector(".card-form");
  let existing = document.getElementById("updateButton");
  if (!existing) {
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "💾 Update Flashcard";
    updateBtn.id = "updateButton";
    updateBtn.onclick = () => updateCard(current);
    form.appendChild(updateBtn);
  }
}

function updateCard(index) {
  const q = document.getElementById("questionInput").value.trim();
  const a = document.getElementById("answerInput").value.trim();
  const tag = document.getElementById("tagInput").value.trim();

  if (q && a) {
    cards[index] = {
      question: q,
      answer: a,
      tag: tag || "Untagged",
      status: cards[index].status
    };

    saveCards();
    showCard(index);

    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    document.getElementById("tagInput").value = "";

    const updateBtn = document.getElementById("updateButton");
    if (updateBtn) updateBtn.remove();
  } else {
    alert("Please enter both question and answer.");
  }
}

function deleteCard() {
  if (cards.length === 0) return;
  if (confirm("Delete this flashcard?")) {
    cards.splice(current, 1);
    saveCards();
    current = Math.max(current - 1, 0);
    showCard(current);
  }
}

window.onload = loadCards;
