import { db } from "~/server/db";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (images, { desc }) => desc(images.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={image.id + "-" + index} className="flex w-48 flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt="" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
