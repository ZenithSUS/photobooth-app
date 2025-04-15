export type FiltersType = {
  sepia: number | string;
  grayscale: number | string;
  hueRotate: number | string;
  invert: number | string;
  brightness: number | string;
  contrast: number | string;
};

export type UserFilters = FiltersType[keyof FiltersType];
export type UserFilterValues = FiltersType;

export type FilterValues = {
  style: string;
  value: number | string;
};

export type Sticker = {
  name: string;
  value: string;
  image: string;
};

export type Background = {
  background: string;
  value: number;
};

export type Border = {
  border: string;
  background: string;
  value: number;
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

export type Photos = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
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

export type CreatePhoto = Omit<Photos, "$id" | "$createdAt" | "$updatedAt">;
export type ShowPhotos = Photos;

export type Saved = {
  $id: string;
  photoID: string;
  userID: string;
};

export type CreateSaved = Omit<Saved, "$id">;

export type ShowSaved = {
  photoID: ShowPhotos;
};

export type Downloaded = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  photoID: string;
  userID: string;
};

export type CreateDownloaded = Omit<
  Downloaded,
  "$id" | "$createdAt" | "$updatedAt"
>;

export type ShowDownloaded = {
  photoID: ShowDownloaded;
};

export type ErrorType = {
  code: number;
  message: string;
};
