import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "@/components/DinoLayout/AnimatedButton";
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })
  return (
    <>
      <section className="relative bg-[#f1faee] py-12 px-8">
        <div className="wrapper relative grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif">
              Welcome to RexOrg
            </h1>
            <p className="text- md:text-xl text-[#e0c28a] font-serif">
              Discover legendary events and unforgettable experiences.
            </p>
            <AnimatedButton width="180px" height="55px" borderColor="#c99a5b" textColor="#e0c28a" borderRadius="12px" transparent={true} >
              <Link href="/" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                🔥 Explore Now
              </Link>
            </AnimatedButton>
          </div>
            <Image src="/assets/images/dino.png" alt="RexOrg"
              width={1000}
              height={1000}
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] drop-shadow-[0_0_18px_rgba(255,204,128,0.9)] neon-glow" />
        </div>
      </section>

      <section>
        <h2 className="h2-bold">Trusted by Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
