"use server";

import { db } from "@/lib/db/db";
import { getUserIdFromCookie } from "../data/data";
import { uploadImg } from "../data/upload_img";
export const createDiary = async ({
  text,
  imageUrl,
}: {
  text: string;
  imageUrl?: string;
}) => {
  try {
    // getting id
    let { id } = await getUserIdFromCookie();

    // Adjusting the time range to match only the specific day
    let today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // upload the image if exist
    let secure_url: string | null = null;
    let public_id: string | null = null;

    if (imageUrl) {
      const ImageUpload = await uploadImg({ imgUrl: imageUrl });
      if (ImageUpload.secure_url) {
        secure_url = ImageUpload.secure_url;
        public_id = ImageUpload.public_id;
      } else {
        return { error: ImageUpload.message };
      }
    }

    let existingDiary = await db.diary.findFirst({
      where: {
        authorId: id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingDiary) {
      // Update the existing diary entry by adding the new text
      await db.dayTexts.create({
        data: {
          text,
          diaryId: existingDiary.id,
          public_id,
          secure_url,
        },
      });
    } else {
      // Create a new diary entry
      await db.diary.create({
        data: {
          authorId: id!,
          diaryText: {
            create: [{ text, public_id, secure_url }],
          },
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.log("server error", error);
    return { error: "Internal server error" };
  }
};

export const getUserDiaries = async () => {
  try {
    let { id } = await getUserIdFromCookie();
    let diaries = await db.diary.findMany({
      where: { authorId: id },
      select: { diaryText: true, createdAt: true },
    });
    return { diaries };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
};
