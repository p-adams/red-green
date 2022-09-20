type Light = {
  id: number;
  color: string;
  duration: number;
};

type Durations = {
  redDuration: number;
  yellowDuration: number;
  greenDuration: number;
};

class StopLight {
  #lights: Light[];
  #durations: Durations;
  constructor() {
    this.#durations = {
      ...{
        redDuration: 1000,
        yellowDuration: 500,
        greenDuration: 2000,
      },
    };
    const { redDuration, yellowDuration, greenDuration } = this.#durations;
    this.#lights = [
      { id: 0, color: "Red", duration: redDuration },
      { id: 1, color: "Yellow", duration: yellowDuration },
      { id: 2, color: "Green", duration: greenDuration },
    ];
  }
  private get lights(): Light[] {
    return this.#lights;
  }

  public set defaults(durations: Durations) {
    this.#durations = durations;
    const ddurations = Object.values(this.#durations).map((d) => d);

    const updatedDefaults = this.#lights.map((light, idx) => ({
      ...light,
      duration: ddurations[idx],
    }));

    this.#lights = updatedDefaults;
  }

  public get defaults() {
    return this.#durations;
  }
  private async run() {
    for (let index = 0; index < this.lights.length; ++index) {
      const light = this.lights[index];
      const prev = this.lights[index - 1];
      if (prev) {
        const lightEl = document.querySelector(`.Light.${light.color}`);
        StopLight.toggleActive(
          document.querySelector(`.Light.${prev.color}`),
          lightEl
        );
      } else {
        StopLight.addClass(
          document.querySelector(`.Light.${this.lights[0].color}`)
        );
      }
      await StopLight.lightState(light);
    }
    StopLight.removeClass(
      document.querySelector(`.Light.${this.lights[2].color}`)
    );
  }

  public async cycle(times: number = 3) {
    while (times) {
      await this.run();
      --times;
    }
  }

  static lightState({ color, duration }: Light) {
    return new Promise((resolve, _reject) => {
      return setTimeout(() => resolve(color), duration);
    });
  }

  static toggleActive(
    from: Element | null,
    to: Element | null,
    className = "Active"
  ) {
    StopLight.removeClass(from, className);
    StopLight.addClass(to, className);
  }

  static removeClass(el: Element | null, className = "Active") {
    el?.classList.remove(className);
  }

  static addClass(el: Element | null, className = "Active") {
    el?.classList.add(className);
  }
}

export default StopLight;
