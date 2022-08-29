import { current_user } from "../stores/user";

export interface Image {
  id: string;
  link: string;
}

export const uploadImage = async (image: Blob) => {
  let res = await fetch(`/upload-image/${current_user.user_id}`, {
    method: "POST",
    headers: {
      "content-type": image.type,
      "content-length": image.size.toString(),
    },
    body: image,
  });

  if (res.ok) {
    return (await res.json()) as Image;
  } else {
    throw new Error(res.status.toString());
  }
};
