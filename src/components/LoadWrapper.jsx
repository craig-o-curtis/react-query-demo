const LoadWrapper = ({ status, error, children, data }) => {
  if (!status) return null;
  return (
    <>
      {status === "error" && <div>Error fetching data: {error.detail}</div>}
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && data.detail && <div>{data.detail}</div>}
      {status === "success" &&
        data &&
        data.results &&
        data.results.length > 0 && <>{children}</>}
    </>
  );
};

export default LoadWrapper;
