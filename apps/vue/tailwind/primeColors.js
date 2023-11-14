const colors = [
  "surface",
  "primary",
  "blue",
  "green",
  "yellow",
  "cyan",
  "pink",
  "indigo",
  "teal",
  "bluegray",
  "orange",
  "purple",
  "red",
  "gray",
];

const shades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

const primeColors = {};

colors.forEach((color) => {
  const variants = {};

  shades.forEach((shade) => {
    variants[shade] = `var(--${color}-${shade})`;
  });

  variants.DEFAULT = `var(--${color}-500)`;

  primeColors[color] = variants;
});

module.exports = primeColors;
