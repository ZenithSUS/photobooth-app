import { v4 as uuidv4 } from "uuid";
import { createPhoto } from "../../actions/photos.ts";
import {
  ENDPOINT as endpointUrl,
  PROJECT_ID as projectId,
  storage,
  BUCKET_ID,
} from "../../appwrite/index.ts";
import { ID, Permission, Role } from "appwrite";
import { toast } from "react-toastify";
import { UserFilters, FiltersType } from "../types.ts";

export default async function shareImages(
  capturedImage: Blob[],
  setCapturedImage: (images: Blob[]) => void,
  setFilterValues: (values: FiltersType) => void,
  setFilter: (values: FiltersType) => void,
  setPrevFilter: (values: FiltersType[]) => void,
  setSticker: (sticker: string) => void,
  setBorderValue: (value: string) => void,
  setBackgroundValue: (value: string) => void,
  setBorderColor: (value: string) => void,
  setBackgroundColor: (value: string) => void,
  setIsModalOpen: (isOpen: boolean) => void,
  name: string,
  title: string,
  sticker: string,
  background: string,
  border: string,
  userFilters: UserFilters[],
) {
  try {
    const userId = JSON.parse(localStorage.getItem("id") as string);

    if (userId === null || userId === undefined || userId === "")
      return toast.error("Please login to share images");

    if (capturedImage.length === 3) {
      const jpegFiles = capturedImage.map((blob, index) => {
        const uniqueFilename = `photo_${index + 1}_${uuidv4()}.jpeg`;
        const file = new File([blob as Blob], uniqueFilename, {
          type: "image/jpeg",
        });
        return file;
      });

      const images = {
        image1: jpegFiles[0],
        image2: jpegFiles[1],
        image3: jpegFiles[2],
      };

      const file1 = new File(
        [images.image1],
        "zenithbooth" + uuidv4() + ".jpg",
        {
          type: "image/jpeg",
        },
      );
      const file2 = new File(
        [images.image2],
        "zenthibooth" + uuidv4() + ".jpg",
        {
          type: "image/jpeg",
        },
      );
      const file3 = new File(
        [images.image3],
        "zenthibooth" + uuidv4() + ".jpg",
        {
          type: "image/jpeg",
        },
      );

      const imageData1 = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file1,
        [Permission.read(Role.any()), Permission.write(Role.user(userId))],
      );
      const imageData2 = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file2,
        [Permission.read(Role.any()), Permission.write(Role.user(userId))],
      );
      const imageData3 = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file3,
        [Permission.read(Role.any()), Permission.write(Role.user(userId))],
      );

      const response = await createPhoto({
        userID: JSON.parse(localStorage.getItem("id") || '""') as string,
        author: name,
        title: title,
        sticker: sticker,
        background: background,
        border: border,
        filters: userFilters,
        image1Url: `${endpointUrl}/storage/buckets/${imageData1.bucketId}/files/${imageData1.$id}/view?project=${projectId}&mode=admin`,
        image2Url: `${endpointUrl}/storage/buckets/${imageData2.bucketId}/files/${imageData2.$id}/view?project=${projectId}&mode=admin`,
        image3Url: `${endpointUrl}/storage/buckets/${imageData3.bucketId}/files/${imageData3.$id}/view?project=${projectId}&mode=admin`,
        imagesId: [
          `${imageData1.$id}`,
          `${imageData2.$id}`,
          `${imageData3.$id}`,
        ],
      });

      if (!response) {
        toast.error("There was an error sharing images");
        return;
      }

      setCapturedImage([]);

      setFilter({
        sepia: 0,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        brightness: 100,
        contrast: 100,
      });

      setFilterValues({
        sepia: "sepia-0",
        grayscale: "grayscale-0",
        hueRotate: "hue-rotate-0",
        invert: "invert-0",
        brightness: "brightness-100",
        contrast: "contrast-100",
      });

      setBackgroundColor(
        "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
      );
      setBorderColor("border-sky-400");
      setBackgroundValue("1");
      setBorderValue("0");
      setSticker("N/A");
      setPrevFilter([]);
      setIsModalOpen(false);
      toast.success("Images shared successfully!");
    }
  } catch (error) {
    console.error(error);
    toast.error("There was an error sharing images");
  }
}
