(function () {
  "use strict";

  const button = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-navigation");
  if (!button || !navigation) return;

  const mobileQuery = window.matchMedia("(max-width: 40rem)");

  function applyLayout() {
    button.hidden = !mobileQuery.matches;
    navigation.hidden = mobileQuery.matches && button.getAttribute("aria-expanded") !== "true";
    if (!mobileQuery.matches) button.setAttribute("aria-expanded", "false");
  }

  function closeMenu(restoreFocus) {
    button.setAttribute("aria-expanded", "false");
    navigation.hidden = true;
    if (restoreFocus) button.focus();
  }

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    navigation.hidden = expanded;
    if (!expanded) navigation.querySelector("a")?.focus();
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileQuery.matches) closeMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileQuery.matches && button.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  mobileQuery.addEventListener("change", applyLayout);
  applyLayout();
})();
