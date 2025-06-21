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
  if (q && a) {
    cards.push({ question: q, answer: a, status: "Needs Work" });
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    saveCards();
    showCard(cards.length - 1);
  } else {
    alert("Please enter both question and answer.");
  }
}

function showCard(index) {
  const qEl = document.getElementById("cardQuestion");
  const aEl = document.getElementById("cardAnswer");
  if (cards.length === 0) {
    qEl.textContent = "No cards added yet.";
    aEl.textContent = "Click to flip";
    return;
  }
  const card = cards[index];
  qEl.textContent = `Q${index + 1}: ${card.question}`;
  aEl.textContent = `📝 ${card.answer} (${card.status})`;
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
    showCard(0);
  }
}

loadCards();
