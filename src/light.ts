import StopLight from "./stopLight";

export function setupLight(el: HTMLDivElement) {
  const lightContainer = document.createElement("div");
  lightContainer.setAttribute("class", "Light-setup-container");

  const template = `<div class="Light-container">
    <div class="Light Red"></div>
    <div class="Light Yellow"></div>
    <div class="Light Green"></div>
  </div>`;

  lightContainer.innerHTML = template;

  window.addEventListener("DOMContentLoaded", (_) => {
    const stopLight = new StopLight();
    stopLight.defaults = {
      redDuration: 400,
      yellowDuration: 200,
      greenDuration: 100,
    };
    stopLight.cycle(10);
  });

  el.appendChild(lightContainer);
}
