import useFetch from "../hooks/useFetch";

function Home() {
  const { data: items, loading } = useFetch("http://localhost:4000/items");

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </main>
  );
}

export default Home;
