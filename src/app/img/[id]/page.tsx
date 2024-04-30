import { getImageById } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImageById(idAsNumber);

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={image.name} className="w-96" />
    </div>
  );
}
