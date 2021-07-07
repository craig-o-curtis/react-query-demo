import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";

const queryClient = new QueryClient();

const App = () => {
  const [page, setPage] = useState("planets");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar onNav={(page) => setPage(page)} />
        {page === "planets" ? <Planets /> : <People />}
        <div className="content"></div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="top-right" />
    </QueryClientProvider>
  );
};

export default App;
