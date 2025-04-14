import { getWantedList } from "@/data/data";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useSearchParams } from "react-router";
import LazyImage from "./LazyImage";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const WantedList = ({ wanted: initialWanted }) => {
  const [searchParams] = useSearchParams();
  const [_, setPage] = useState(1);
  const [data, setData] = useState(initialWanted.items);
  const [hasMore, setHasMore] = useState(
    initialWanted.total > initialWanted.items.length,
  );
  const [loadingInitial, setLoadingInitial] = useState(false);

  const fetchData = async (pageNum, currentSearchParams) => {
    try {
      const res = await getWantedList(
        pageNum,
        Object.fromEntries(currentSearchParams),
      );
      const newItems = res.items || [];

      setData((prevItems) => {
        const uniqueNewItems = newItems.filter(
          (newItem) =>
            !prevItems.some((existingItem) => existingItem.uid === newItem.uid),
        );
        return [...prevItems, ...uniqueNewItems];
      });
      setHasMore(res.total > data.length + (res.items ? res.items.length : 0));
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const handleLoadMoreData = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage, searchParams);
      return nextPage;
    });
  };

  useEffect(() => {
    setPage(1);
    setData(initialWanted.items);
    setHasMore(initialWanted.total > initialWanted.items.length);
    setLoadingInitial(true);

    const fetchInitialDataWithFilters = async () => {
      try {
        const res = await getWantedList(1, Object.fromEntries(searchParams));
        setData(res.items);
        setHasMore(res.total > res.items.length);
      } catch (error) {
        console.error("Error fetching initial data with filters:", error);
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchInitialDataWithFilters();
  }, [searchParams, initialWanted.items, initialWanted.total]);

  if (data.length === 0 && !loadingInitial) {
    return <div className="error">No persons found</div>;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        next={handleLoadMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="grid card-grid_list wanted-grid_list">
          <LazyLoadComponent>
            {data.map((person) => (
              <WantedListItem person={person} key={person.uid} />
            ))}
          </LazyLoadComponent>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default WantedList;

function WantedListItem({ person }) {
  return (
    <div className=" h-full flex p-4  flex-col items-stretch justify-start border-b border-r border-pepper relative hover:bg-gray-50/60">
      <div className="relative max-h-full h-80  rounded-md overflow-hidden">
        {person.images && (
          <LazyImage
            className="absolute object-center bg-no-repeat inset-0 w-full h-full object-fill"
            imageSrc={person.images[0].original}
            alt={person.title}
          />
          // <img
          //   className="absolute object-center bg-no-repeat inset-0 w-full h-full object-fill"
          //   src={person.images[0].original}
          //   alt={person.title}
          // />
        )}
      </div>
      <div className="p-4">
        <h3 className="uppercase text-xl font-medium">{person.title}</h3>
        <div className="text-sm">
          <p>Charges: {person.description}</p>
        </div>
      </div>
      <Link
        to={`/wanted/${person.uid}`}
        className="z-10 cursor-pointer flex inset-0 justify-center items-center w-full h-full absolute"
      >
        <div className="sr-only">Learn more about this person</div>
      </Link>
    </div>
  );
}
