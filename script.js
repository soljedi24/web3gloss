const glossaryList = document.getElementById("glossary-list");
const searchInput = document.getElementById("search");

let glossaryData = [];
let learnedTerms = JSON.parse(localStorage.getItem("learnedTerms")) || [];

function renderGlossary(terms) {
  glossaryList.innerHTML = "";

  terms.forEach((item) => {
    const li = document.createElement("li");
    li.classList.toggle("learned", learnedTerms.includes(item.term));

    const header = document.createElement("div");
    header.className = "term-header";

    const title = document.createElement("strong");
    title.textContent = item.term;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = learnedTerms.includes(item.term) ? "Unlearn" : "Learned";
    toggleBtn.addEventListener("click", () => toggleLearned(item.term));

    header.appendChild(title);
    header.appendChild(toggleBtn);

    const desc = document.createElement("p");
    desc.textContent = item.definition;

    li.appendChild(header);
    li.appendChild(desc);
    glossaryList.appendChild(li);
  });
}

function toggleLearned(term) {
  if (learnedTerms.includes(term)) {
    learnedTerms = learnedTerms.filter(t => t !== term);
  } else {
    learnedTerms.push(term);
  }
  localStorage.setItem("learnedTerms", JSON.stringify(learnedTerms));
  filterAndRender();
}

function filterAndRender() {
  const query = searchInput.value.toLowerCase();
  const filtered = glossaryData.filter(item =>
    item.term.toLowerCase().includes(query) ||
    item.definition.toLowerCase().includes(query)
  );
  renderGlossary(filtered);
}

searchInput.addEventListener("input", filterAndRender);

// Load glossary data from JSON
fetch("glossary.json")
  .then(res => res.json())
  .then(data => {
    glossaryData = data;
    renderGlossary(glossaryData);
  });
