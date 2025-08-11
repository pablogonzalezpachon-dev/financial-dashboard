import { inter, playwrite_AU_QLD } from "@/lib/styles/fonts";
import Link from "next/link";
import { DiAtom } from "react-icons/di";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="grid min-[1200px]:grid-row-2 min-[1200px]:grid-cols-2 grid-cols-1 grid-rows-1">
      <div className="min-[1200px]:col-span-2 h-60 p-6">
        <div className="flex flex-row bg-red-400 h-full rounded-md items-end pl-5">
          <DiAtom size="60" color="white" className="mb-3 md:mb-4" />
          <p
            className={`${playwrite_AU_QLD.className} text-white text-5xl mb-4 md:mb-5 `}
          >
            Acme
          </p>
        </div>
      </div>
      <div className=" h-140 px-6 pb-5 flex min-[1200px]:w-180">
        <div className="bg-gray-100 h-full w-full rounded-md flex flex-col justify-center items-center">
          <h1
            className={` ${inter.className} mb-5 font-medium text-6xl relative w-max font-mono 
before:absolute before:inset-0 before:animate-typewriter-title before:bg-gray-100 
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret-title after:bg-black`}
          >
            Welcome to Acme!
          </h1>
          <h2
            className={` ${inter.className} text-2xl relative w-max font-mono 
before:absolute before:inset-0 before:animate-typewriter-text before:bg-gray-100 
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret-text after:bg-black`}
          >
            A financial dashboard build upon Next.js learn course
          </h2>
          <Link
            href="/login"
            className="border mt-10 p-2 h-12 bg-red-400 text-white rounded-lg w-40 h-12"
          >
            <div className="flex flex-row items-center justify-center gap-x-5">
              <p className="text-xl ml-5">Log in</p>
              <FaArrowRight size="20" className="mx-auto" />
            </div>
          </Link>
        </div>
      </div>
      <div className="">
        <DiAtom
          size="410"
          color="black"
          className="m-auto mt-10 animate-atom opacity-0"
        />
      </div>
    </div>
  );
}
