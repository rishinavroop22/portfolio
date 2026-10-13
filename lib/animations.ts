// One timing system for the whole site.
export const EASE = [0.16, 1, 0.3, 1] as const; // expo-out, matches --ease-out-expo
export const GSAP_EASE = "expo.out";

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 1.1,
} as const;

export const STAGGER = 0.06;
