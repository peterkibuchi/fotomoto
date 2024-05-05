import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { analyticsServerClient } from "~/server/analytics";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export const getImagesByUser = async () => {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
};

export async function getImageById(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) =>
      and(eq(model.id, id), eq(model.userId, user.userId)),
  });

  if (!image) redirect("/");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
