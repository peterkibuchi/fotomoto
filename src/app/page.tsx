import { SignedIn, SignedOut } from "@clerk/nextjs";

import { db } from "~/server/db";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (images, { desc }) => desc(images.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.url} alt="" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>

      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
