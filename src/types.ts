export type Level = {
  readonly level: number;
  readonly deviceName: string;
  readonly cost: number;
  readonly clipsPerClick: number;
};

export type GameState = {
  readonly clips: number;
  readonly currentLevel: number;
};

export type RendererApi = {
  readonly titleEl: HTMLElement;
  readonly levelEl: HTMLElement;
  readonly counterEl: HTMLElement;
  readonly upgradeBtn: HTMLButtonElement;
  readonly svgContainer: HTMLElement;
  readonly containerEl: HTMLElement;
  readonly deviceNameEl: HTMLElement;
  readonly nextLevelEl: HTMLElement;
};
