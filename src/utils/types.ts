export type FiltersType = {
  sepia: number | string;
  grayscale: number | string;
  hueRotate: number | string;
  invert: number | string;
  brightness: number | string;
  contrast: number | string;
};

export type FilterValues = {
  style: string;
  value: number | string;
};

export type UserFilters = FiltersType[keyof FiltersType];
export type UserFilterValues = FiltersType;

export type Background = {
  background: string;
  value: number;
};

export type Border = {
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
  filters: UserFilters[];
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

export type ShowPhotos = CreatePhoto & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
};

export type SharedPhotos = {
  $id: string;
  userID: string;
  photoID: string;
};

export type Sticker = {
  name: string;
  value: string;
  image: string;
};
