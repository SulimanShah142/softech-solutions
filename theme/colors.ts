const brandPalette = [
  { css: "#078df3", rgb: "7,141,243" },
  { css: "#23b9ff", rgb: "35,185,255" },
  { css: "#08d890", rgb: "8,216,144" },
  { css: "#edf3fa", rgb: "237,243,250" },
] as const;

export const BrandColors = {
  primary: brandPalette[0],
  secondary: brandPalette[1],
  success: brandPalette[2],
  foreground: brandPalette[3],
} as const;

export const StatCardPalette = brandPalette;
