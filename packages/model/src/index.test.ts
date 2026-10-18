import { describe, expect, it } from "vitest";
import { hellBreakdown, percentGoingToHell, totalPercentGoingToHell, type Religion } from "./index";

const christianity: Religion = {
  id: "christianity",
  name: "Christianity",
  worldPopulationPercent: 31,
  savedPercent: 100,
};

const islam: Religion = {
  id: "islam",
  name: "Islam",
  worldPopulationPercent: 25,
  savedPercent: 0,
};

const hinduism: Religion = {
  id: "hinduism",
  name: "Hinduism",
  worldPopulationPercent: 15,
  savedPercent: 60,
};

describe("percentGoingToHell", () => {
  it("returns 0 when everyone is saved", () => {
    expect(percentGoingToHell(christianity)).toBe(0);
  });

  it("returns the full population share when nobody is saved", () => {
    expect(percentGoingToHell(islam)).toBe(25);
  });

  it("scales by the unsaved fraction", () => {
    expect(percentGoingToHell(hinduism)).toBeCloseTo(6);
  });
});

describe("hellBreakdown", () => {
  it("returns one result per religion", () => {
    const results = hellBreakdown([christianity, islam, hinduism]);
    expect(results).toHaveLength(3);
    expect(results[0].religion).toBe(christianity);
    expect(results[0].percentGoingToHell).toBe(0);
  });

  it("returns an empty array for no religions", () => {
    expect(hellBreakdown([])).toEqual([]);
  });
});

describe("totalPercentGoingToHell", () => {
  it("sums the individual percentages", () => {
    expect(totalPercentGoingToHell([christianity, islam, hinduism])).toBeCloseTo(31);
  });

  it("returns 0 for an empty list", () => {
    expect(totalPercentGoingToHell([])).toBe(0);
  });
});
