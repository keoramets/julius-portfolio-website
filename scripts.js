function toggleMenu() {
  document.getElementById('menu').classList.toggle('active');
}


const PROJECTS = {
  "keytracking": {
    title: "Key Tracking System",
    company: "Indianapolis Airport Authority",
    description:
      "Built a full-stack system to track physical keys issued to employees, including assignment history and status updates.",
    tech: ["ASP.NET MVC", "SQL Server", "SSMS", "HTML", "CSS", "JavaScript"],
    images: [
      "./images/projects/keytracking/1.png",
      "./images/projects/keytracking/2.png",
      "./images/projects/keytracking/3.png"
    ]
  },
  "ngroup-ui": {
    title: "Simulation Dashboard UI",
    company: "nGroup",
    description:
      "Built the frontend and Node/Express server that helps users interact with simulation workflows and view key outputs in a usable interface.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
    images: [
      "./images/projects/ngroup/1.png",
      "./images/projects/ngroup/2.png",
      "./images/projects/ngroup/3.png"
    ]
  },
  "a trophy business website": {
    title: "A Trophy Business Website",
    company: "A Trophy Business",
    description:
      "Designed and developed a responsive website for the company in collaboration with another intern. I mainly focused on the Home, About, and Contact pages.",
    tech: ["HTML", "CSS", "JavaScript"],
    images: [
      "./images/projects/trophy/1.png",
      "./images/projects/trophy/2.png"
    ]
  }
};

const modal = document.getElementById("projectModal");
const backdrop = document.getElementById("modalBackdrop");
const closeBtn = document.getElementById("modalClose");

const titleEl = document.getElementById("modalTitle");
const companyEl = document.getElementById("modalCompany");
const descEl = document.getElementById("modalDescription");
const tagsEl = document.getElementById("modalTags");

const slideImg = document.getElementById("slideImage");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsWrap = document.getElementById("slideDots");

let currentProject = null;
let currentIndex = 0;

function openModal(projectKey) {
  currentProject = PROJECTS[projectKey];
  currentIndex = 0;

  titleEl.textContent = currentProject.title;
  companyEl.textContent = currentProject.company;
  descEl.textContent = currentProject.description;

  tagsEl.innerHTML = currentProject.tech
    .map(t => `<span class="tag">${t}</span>`)
    .join("");

  renderSlides();
  setSlide(0);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentProject = null;
}

function setSlide(index) {
  if (!currentProject) return;
  const max = currentProject.images.length;
  currentIndex = (index + max) % max;

  slideImg.src = currentProject.images[currentIndex];
  updateDots();
}

function renderSlides() {
  dotsWrap.innerHTML = "";
  currentProject.images.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = "dot";
    btn.addEventListener("click", () => setSlide(i));
    dotsWrap.appendChild(btn);
  });
}

function updateDots() {
  [...dotsWrap.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Click cards
document.getElementById("projectsGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;
  openModal(card.dataset.project);
});

// Enter key for accessibility
document.getElementById("projectsGrid").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const card = e.target.closest(".project-card");
  if (!card) return;
  openModal(card.dataset.project);
});

prevBtn.addEventListener("click", () => setSlide(currentIndex - 1));
nextBtn.addEventListener("click", () => setSlide(currentIndex + 1));

backdrop.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

// Esc to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

document.getElementById("year").textContent = new Date().getFullYear();