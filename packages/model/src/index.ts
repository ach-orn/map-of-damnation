export interface Religion {
  id: string;
  name: string;
  /** Percentage of the world's population identifying with this religion (0–100). */
  worldPopulationPercent: number;
  /**
   * Percentage of adherents of this religion considered "saved"
   * according to the project's (tongue-in-cheek) criteria (0–100).
   */
  savedPercent: number;
}

export interface HellResult {
  religion: Religion;
  /** Percentage of the world's population of this religion going to hell. */
  percentGoingToHell: number;
}

export function percentGoingToHell(religion: Religion): number {
  return religion.worldPopulationPercent * (1 - religion.savedPercent / 100);
}

export function hellBreakdown(religions: Religion[]): HellResult[] {
  return religions.map((religion) => ({
    religion,
    percentGoingToHell: percentGoingToHell(religion),
  }));
}

export function totalPercentGoingToHell(religions: Religion[]): number {
  return hellBreakdown(religions).reduce((sum, result) => sum + result.percentGoingToHell, 0);
}
