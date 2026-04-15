const benefitTabs = document.querySelectorAll(".benefit-tab");
const benefitPanels = document.querySelectorAll(".benefit-panel");
const personaTabs = document.querySelectorAll(".persona-tab");
const personaPanels = document.querySelectorAll(".persona-panel");
const journeySteps = document.querySelectorAll(".journey-step");
const journeyPanels = document.querySelectorAll(".journey-panel");
const choiceButtons = document.querySelectorAll(".choice-btn");
const scrollButtons = document.querySelectorAll("[data-scroll-target]");
const chatWindow = document.getElementById("chatWindow");
const flowStatus = document.getElementById("flowStatus");

const chatScenarios = {
  opd: [
    { speaker: "user", text: "I have a fever and need help tonight." },
    { speaker: "bot", text: "You still have 2 free OPD visits. I found a tele-consult slot at 6:30 PM and a clinic 900 meters from campus." },
    { speaker: "bot", text: "Your booking can be fully covered. Want me to confirm the tele-consult now?" }
  ],
  therapy: [
    { speaker: "user", text: "I've been anxious for days and can't focus." },
    { speaker: "bot", text: "I'm here with you. You have 4 counseling sessions left, and I can help you book one privately." },
    { speaker: "bot", text: "The earliest therapist opening is tomorrow at 11:00 AM. If this feels urgent or unsafe, I can escalate to a human counselor right away." }
  ],
  coverage: [
    { speaker: "user", text: "What does my insurance actually cover?" },
    { speaker: "bot", text: "Your plan includes inpatient insurance, 2 OPD consultations, 1 annual health checkup, and 6 counseling sessions." },
    { speaker: "bot", text: "For fever, stomach issues, and minor infections, OPD is the right starting point. Emergencies like severe breathing trouble should go straight to the ER." }
  ]
};

function setActive(items, target, attr, activeClass = "active") {
  items.forEach((item) => {
    item.classList.toggle(activeClass, item.dataset[attr] === target);
  });
}

benefitTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.benefit;
    setActive(benefitTabs, target, "benefit");
    setActive(benefitPanels, target, "panel");
  });
});

personaTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.persona;
    setActive(personaTabs, target, "persona");
    setActive(personaPanels, target, "personaPanel");
  });
});

journeySteps.forEach((step) => {
  step.addEventListener("click", () => {
    const target = step.dataset.step;
    setActive(journeySteps, target, "step");
    setActive(journeyPanels, target, "stepPanel");
  });
});

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const scenario = chatScenarios[button.dataset.choice];
    if (!scenario || !chatWindow) {
      return;
    }

    chatWindow.innerHTML = "";
    scenario.forEach((message) => {
      const bubble = document.createElement("div");
      bubble.className = `bubble ${message.speaker}`;
      bubble.textContent = message.text;
      chatWindow.appendChild(bubble);
    });

    if (flowStatus) {
      const labels = {
        opd: "OPD flow ready",
        therapy: "Counseling escalation ready",
        coverage: "Coverage explained"
      };
      flowStatus.textContent = labels[button.dataset.choice] || "Ready to guide";
    }
  });
});

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.scrollTarget;
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
