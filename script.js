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
    cards.push({ question: q, answer: a, tag: tag || "Untagged", status: "Needs Work" });
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    document.getElementById("tagInput").value = "";
    saveCards();
    showCard(cards.length - 1);
  } else {
    alert("Please fill both question and answer.");
  }
}

function showCard(index) {
  const card = cards[index];
  document.getElementById("cardQuestion").textContent = `Q${index + 1}: ${card.question}`;
  document.getElementById("cardAnswer").textContent = `🧠 ${card.answer} \n📌 ${card.status}`;
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
  if (confirm("Delete all flashcards?")) {
    cards = [];
    localStorage.removeItem("dsa_flashcards");
    showCard(0);
  }
}

loadCards();
