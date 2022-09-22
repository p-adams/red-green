type Light = {
  id: number;
  color: string;
  duration: number;
};

export type Durations = {
  redDuration: number;
  yellowDuration: number;
  greenDuration: number;
};

export interface StopLight {
  lights: Light[];
  durations: Durations;
  lightState: (light: Light) => Promise<string>;
  toggleActive: (
    from: Element | null,
    to: Element | null,
    className?: string
  ) => void;
  run: () => void;
  cycle: (times: number) => void;
  defaults: () => Durations;
  addClass: (el: Element | null, className?: string) => void;
  removeClass: (el: Element | null, className?: string) => void;
}

const StopLight: {
  init: () => void;
} & StopLight = {
  lights: [],
  durations: {
    redDuration: 1000,
    yellowDuration: 500,
    greenDuration: 2000,
  },
  init() {
    const { redDuration, yellowDuration, greenDuration } = this.durations;
    this.lights = [
      { id: 0, color: "Red", duration: redDuration },
      { id: 1, color: "Yellow", duration: yellowDuration },
      { id: 2, color: "Green", duration: greenDuration },
    ];
    return this;
  },

  get defaults() {
    return this.durations;
  },
  set defaults(durations: any) {
    if (!durations) {
      return;
    }
    this.durations = durations;
    const ddurations = Object.values(this.durations).map((d) => d);

    this.lights = this.lights.map((light, idx) => ({
      ...light,
      duration: ddurations[idx],
    }));
  },
  toggleActive(from: Element | null, to: Element | null, className = "Active") {
    this.removeClass(from, className);
    this.addClass(to, className);
  },
  addClass(el: Element | null, className = "Active") {
    el?.classList.add(className);
  },
  removeClass(el: Element | null, className = "Active") {
    el?.classList.remove(className);
  },
  lightState({ color, duration }: Light) {
    return new Promise((resolve, _reject) => {
      return setTimeout(() => resolve(color), duration);
    });
  },
  async run() {
    for (let index = 0; index < this.lights.length; ++index) {
      const currentLight = this.lights[index];
      const prevLight = this.lights[index - 1];
      if (prevLight) {
        const lightEl = document.querySelector(`.Light.${currentLight.color}`);
        this.toggleActive(
          document.querySelector(`.Light.${prevLight.color}`),
          lightEl
        );
      } else {
        this.addClass(document.querySelector(`.Light.${this.lights[0].color}`));
      }
      await this.lightState(currentLight);
    }
    this.removeClass(document.querySelector(`.Light.${this.lights[2].color}`));
  },
  async cycle(times: number) {
    while (times) {
      await this.run();
      --times;
    }
  },
};
export default Object.create(StopLight);
