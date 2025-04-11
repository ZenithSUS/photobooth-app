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

export type background = {
  background: string;
  value: number;
};

export type border = {
  border: string;
  background: string;
  value: number;
};

export type CreatePhoto = {
  author: string;
  title: string;
  userID: string;
  sticker: string;
  background: string;
  border: string;
  image1Url: string | File;
  image2Url: string | File;
  image3Url: string | File;
};

export type DownloadType = {
  photoBoothRef: React.RefObject<HTMLDivElement>;
};

export type User = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  photo: string;
};

export type userData = {
  name: string;
  email: string;
};

export type ShowPhotos = CreatePhoto & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
};

export type Sticker = {
  name: string;
  value: string;
  image: string;
};
