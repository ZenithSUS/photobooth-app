export type filtersType = {
  sepia: number | string;
  grayscale: number | string;
  hueRotate: number | string;
  invert: number | string;
  brightness: number | string;
  contrast: number | string;
};

export type filterValues = {
  style: string;
  value: number | string;
};

export type Images = {
  userID: string;
  image1Url: string | File;
  image2Url: string | File;
  image3Url: string | File;
};

export type downloadType = {
  photoBoothRef: React.RefObject<HTMLDivElement>;
};
