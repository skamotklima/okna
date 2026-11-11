const REVEAL_SELECTORS = [
  ".hero-content",
  ".hero-card",
  ".metrics-grid .metric-card",
  ".section-heading",
  ".services-grid .service-card",
  ".project-grid .project-card",
  ".reviews-grid .review-card",
  ".process-grid .process-card",
  ".faq-list details",
  ".contact-form",
  ".contact-card",
  ".page-hero > *",
  ".card-grid .info-card",
  ".privacy-grid .privacy-card",
  ".details-box",
  ".cta-box",
  ".footer-inner > *",
] as const;

function collectTargets(): HTMLElement[] {
  const selector = REVEAL_SELECTORS.join(",");
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

  return nodes.filter((node) => {
    if (node.dataset.revealReady === "1") {
      return false;
    }

    node.dataset.revealReady = "1";
    return true;
  });
}

function setDelays(nodes: HTMLElement[]): void {
  const delaysByParent = new Map<Element, number>();

  nodes.forEach((node) => {
    const parent = node.parentElement;
    if (!parent) {
      node.style.setProperty("--reveal-delay", "0ms");
      return;
    }

    const index = delaysByParent.get(parent) ?? 0;
    delaysByParent.set(parent, index + 1);
    node.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  });
}

function revealImmediately(nodes: HTMLElement[]): void {
  nodes.forEach((node) => node.classList.add("is-visible"));
}

function setupReveal(): void {
  const nodes = collectTargets();
  if (!nodes.length) {
    return;
  }

  setDelays(nodes);
  nodes.forEach((node) => {
    node.dataset.reveal = "";
  });
  revealImmediately(nodes);
}

export default defineNuxtPlugin((nuxtApp) => {
  const start = () => {
    window.requestAnimationFrame(() => {
      setupReveal();
    });
  };

  nuxtApp.hook("page:finish", start);

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
});
