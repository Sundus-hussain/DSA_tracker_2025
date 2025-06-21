let cards = [];
let current = 0;
let flipped = false;

// Load cards from localStorage
function loadCards() {
  const data = localStorage.getItem("dsa_flashcards");
  if (data) {
    cards = JSON.parse(data);
    showCard(current);
  }
}

// Save cards to localStorage
function saveCards() {
  localStorage.setItem("dsa_flashcards", JSON.stringify(cards));
}

// Add a new flashcard
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

    // Clear input fields
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    document.getElementById("tagInput").value = "";

    saveCards();
    showCard(cards.length - 1);
  } else {
    alert("Please enter both question and answer.");
  }
}

// Display the current card
function showCard(index) {
  if (cards.length === 0) {
    document.getElementById("cardQuestion").textContent = "No cards yet.";
    document.getElementById("cardAnswer").textContent = "Click to flip";
    document.getElementById("cardTag").textContent = "";
    return;
  }

  const card = cards[index];
  const questionDiv = document.getElementById("cardQuestion");
  const answerDiv = document.getElementById("cardAnswer");
  const tagDiv = document.getElementById("cardTag");

  // Set question
  questionDiv.textContent = `Q${index + 1}: ${card.question}`;

  // Clear previous answer content
  answerDiv.innerHTML = "";

  // Add each line of the answer as its own div
  const lines = card.answer.split("\n");
  lines.forEach(line => {
    const lineDiv = document.createElement("div");
    lineDiv.textContent = line;
    answerDiv.appendChild(lineDiv);
  });

  // Add status at the end
  const statusDiv = document.createElement("div");
  statusDiv.textContent = `📌 ${card.status}`;
  statusDiv.style.marginTop = "10px";
  statusDiv.style.color = "#7ed6df";
  answerDiv.appendChild(statusDiv);

  // Set tag
  tagDiv.textContent = `#${card.tag}`;

  // Reset flip state
  document.getElementById("flashcard").classList.remove("flipped");
  flipped = false;
}

// Flip the flashcard
function flipCard() {
  flipped = !flipped;
  document.getElementById("flashcard").classList.toggle("flipped", flipped);
}

// Navigate to next card
function nextCard() {
  if (cards.length === 0) return;
  current = (current + 1) % cards.length;
  showCard(current);
}

// Navigate to previous card
function prevCard() {
  if (cards.length === 0) return;
  current = (current - 1 + cards.length) % cards.length;
  showCard(current);
}

// Mark card as practiced
function markPracticed() {
  if (cards.length === 0) return;
  cards[current].status = "Practiced";
  saveCards();
  showCard(current);
}

// Mark card as needs work
function markNeedsWork() {
  if (cards.length === 0) return;
  cards[current].status = "Needs Work";
  saveCards();
  showCard(current);
}

// Clear all flashcards
function clearAll() {
  if (confirm("Are you sure you want to delete all flashcards?")) {
    cards = [];
    localStorage.removeItem("dsa_flashcards");

    // Clear UI manually
    document.getElementById("cardQuestion").textContent = "No cards yet.";
    document.getElementById("cardAnswer").textContent = "Click to flip";
    document.getElementById("cardTag").textContent = "";
    document.getElementById("flashcard").classList.remove("flipped");
    flipped = false;
  }
}

// Initial load
loadCards();
