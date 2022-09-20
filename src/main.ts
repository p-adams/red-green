import "./style.css";

import { setupLight } from "./light";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="Red-green-app"></div>
`;

setupLight(document.querySelector<HTMLDivElement>("#Red-green-app")!);
