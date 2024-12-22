import { apiUrls } from "./api-urls";

export const ImageHandler = {
    url: (imageURL: string | undefined | null): string => {
        if (imageURL)
            return `${apiUrls.base}/Uploads/${imageURL}`
        return '../assets/Images/Item-No-Image.jpg'
    },
    noImage: "../assets/Images/Item-No-Image.jpg",
}