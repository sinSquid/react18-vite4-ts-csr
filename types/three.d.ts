export declare class Stats {
  constructor()

  REVISION: number

  dom: HTMLDivElement

  /**
   * @param value 0:fps, 1: ms, 2: mb, 3+: custom
   */
  showPanel(value: number): void

  begin(): void

  end(): number

  update(): void

  addPanel(panel: Stats.Panel): Stats.Panel
}

export declare function setName(str: string): void
