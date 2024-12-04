"use client";
import Link from "next/link";
export default function MovieCard({ movie }) {
  const { id, image_url, title, overview, popularity, release_data } = movie;

  return (
    <div className="relative col-span-1">
      {/* Image 부분  */}
      <img src={image_url} className="w-full" />
      {/* ,"Follow the mythic journey of Paul Atreides as he unites
      with Chani and the Fremen while on a path of revenge against the
      conspirators who destroyed his family. Facing a choice between the love of
      his life and the fate of the known universe, Paul endeavors to prevent a
      terrible future only he can foresee.",8.3,3437.313,2024-02-27 */}
      {/* Title Dim */}
      <Link href={`/movies/${id}`}>
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-80">
          <p className="text-xl font-bold text-white">{title}</p>
        </div>
      </Link>
    </div>
  );
}
