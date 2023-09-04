import { atom, useAtom } from "jotai";

export const galleryAtom = atom(false);
export const galleryImages = atom<Array<string>>([]);
export const currentGalleryImage = atom<null | string>(null);

const useGallery = () => {
  const [galleryVisible, setGalleryVisible] = useAtom(galleryAtom);
  const [galleryImage, setCurrentGalleryImage] = useAtom(currentGalleryImage);
  const [images, setImages] = useAtom(galleryImages);

  const open = ({
    images,
    image,
  }: {
    images: Array<string>;
    image: string;
  }) => {
    setGalleryVisible(true);
    setImages(images);
    setCurrentGalleryImage(image);
  };

  const close = () => {
    setGalleryVisible(false);
    setCurrentGalleryImage(null);
    setImages([]);
  };

  return { open, close, galleryVisible, galleryImage, images };
};

export default useGallery;
