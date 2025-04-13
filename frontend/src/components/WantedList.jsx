import { getWantedList } from "@/data/data";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";

const WantedList = ({ wanted }) => {
  console.log({ wanted });
  const [page, setPage] = useState(1);
  const [data, setData] = useState(wanted.items);

  const fetchData = async (pageNum) => {
    try {
      const res = await getWantedList(pageNum);
      setData((prevItems) => [...prevItems, ...res.items]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMoreData = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });
  };

  // const [persons, setPersons] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const fetchPersons = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getWantedList({ page, pageSize: 20 });
  //       setPersons(data.items || []);
  //       setTotalPages(Math.ceil((data.total || 0) / 20));
  //     } catch (err) {
  //       setError("Failed to load wanted list");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPersons();
  // }, [page]);

  // const handlePrevPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (page < totalPages) {
  //     setPage(page + 1);
  //   }
  // };

  // if (loading && persons.length === 0)
  //   return <div className="loading">Loading...</div>;
  // if (error) return <div className="error">{error}</div>;
  if (wanted.items.length === 0)
    return <div className="error">No persons found</div>;

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        next={handleLoadMoreData}
        hasMore={wanted.total > data.length}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="grid card-grid_list wanted-grid_list">
          {data.map((person) => (
            <WantedListItem person={person} key={person.uid} />
          ))}
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
          <img
            className="absolute object-center bg-no-repeat inset-0 w-full h-full object-fill"
            src={person.images[0].original}
            alt={person.title}
          />
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
