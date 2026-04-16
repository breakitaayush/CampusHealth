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
    { speaker: "user", text: "I have a fever tonight and I don't know what to do." },
    { speaker: "bot", text: "Campus Health includes 1 OPD consultation, and it's still available for you." },
    { speaker: "bot", text: "I found a tele-consult slot at 6:30 PM and a nearby clinic option. Want me to confirm the tele-consult?" }
  ],
  therapy: [
    { speaker: "user", text: "I've been anxious for days and can't focus." },
    { speaker: "bot", text: "I'm here with you. You still have 2 counseling sessions in your plan, and I can help you book one privately." },
    { speaker: "bot", text: "The earliest opening is tomorrow at 11:00 AM. If this feels urgent or unsafe, I can escalate to a human counselor right away." }
  ],
  coverage: [
    { speaker: "user", text: "What does my plan actually include?" },
    { speaker: "bot", text: "Campus Health includes 2 counseling sessions, 1 OPD consultation, insurance guidance, and AI Buddy support." },
    { speaker: "bot", text: "For stress or anxiety, counseling is the right path. For fever or stomach issues, start with OPD. Emergencies should go straight to the ER." }
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
        opd: "OPD consult ready",
        therapy: "Counseling flow ready",
        coverage: "Plan explained"
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
