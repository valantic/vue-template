// Keep in sync with src/setup/scss/_color.scss

interface IColorType {
  name: string;
  value: string[];
}

export interface IColors {
  primary: IColorType[];
  secondary: IColorType[];
  grayscale: IColorType[];
  gradient: IColorType[];
  status: IColorType[];
}

const colors: IColors = {
  primary: [
    { name: '$color-primary--1', value: ['#ff4b4b'] },
    { name: '$color-primary--2', value: ['#000000'] },
    { name: '$color-primary--3', value: ['#ffffff'] },
  ],
  secondary: [
    { name: '$color-secondary--1', value: ['#2c68a0'] },
    { name: '$color-secondary--2', value: ['#75b4e0'] },
    { name: '$color-secondary--3', value: ['#2fa61c'] },
    { name: '$color-secondary--4', value: ['#b50f0f'] },
    { name: '$color-secondary--5', value: ['#e2951f'] },
  ],
  grayscale: [
    { name: '$color-grayscale--200', value: ['#646464'] },
    { name: '$color-grayscale--400', value: ['#afafaf'] },
    { name: '$color-grayscale--500', value: ['#d8d8d8'] },
    { name: '$color-grayscale--600', value: ['#f3f3f3'] },
  ],
  gradient: [
    { name: '$color-gradient--1-0 - $color-gradient--1-1', value: ['#000000', '#ffffff'] },
    { name: '$color-gradient--2-0 - $color-gradient--2-1', value: ['#2c68a0', '#75b4e0'] },
  ],
  status: [
    { name: '$color-status--success', value: ['#2fa61c'] },
    { name: '$color-status--info', value: ['#e2951f'] },
    { name: '$color-status--error', value: ['#b50f0f'] },
  ],
};

export default colors;
