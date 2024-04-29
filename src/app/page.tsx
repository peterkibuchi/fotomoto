import { SignedIn, SignedOut } from "@clerk/nextjs";

import { getImagesByUser } from "~/server/queries";

async function Images() {
  const images = await getImagesByUser();

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
