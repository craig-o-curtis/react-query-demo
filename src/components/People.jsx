import { useState } from "react";
import { useQuery } from "react-query";
import LoadWrapper from "./LoadWrapper";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return await res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status, error } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    {
      keepPreviousData: true, // ** keeps data until data is resolved, so no loading
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
      <h2>People</h2>
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
        {data &&
          data.results &&
          data.results.map((p) => <Person key={p.name} person={p} />)}
      </LoadWrapper>
    </div>
  );
};

export default People;
