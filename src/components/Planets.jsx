import { useState } from "react";
import { useQuery } from "react-query";
import LoadWrapper from "./LoadWrapper";
import Planet from "./Planet";

// ** passing query params - key is key-of-query
const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return await res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  //** arg1' key-of-query' or ['key-of-query', ...params] !! doesn't work
  //** arg2 api method to get data */
  //** arg3 config for RQ */
  const { data, status, error } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      staleTime: 2000, // ** fetches stale data (test by switching Planets > People > Planets)
      cacheTime: 5000, // ** how long stale requests stay until refetched
      refetchOnMount: true, // ** true by default
      onSuccess: (res) => {
        console.log(res);
      },
      onError: () => console.error("error fetching planets"),
      onSettled: () => console.log("settled planets..."), // ** finally
      retry: 3,
      retryDelay: 1000,
    }
  );

  const handleIncrementPage = () => {
    setPage((prevPage) => (!data || !data.next ? prevPage : prevPage + 1));
  };

  const handleDecrementPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => handleDecrementPage()} disabled={page === 1}>
        Prev
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => handleIncrementPage()}
        disabled={!data || !data.next}
      >
        Next
      </button>
      <LoadWrapper status={status} error={error} data={data}>
        <>
          {data &&
            data.results &&
            data.results.map((p) => <Planet key={p.name} planet={p}></Planet>)}
        </>
      </LoadWrapper>
    </div>
  );
};

export default Planets;
