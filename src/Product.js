import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Product() {
  const count = useSelector((state) => state.counter.value)
  let params = useParams();
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className="text-center"><span>{count}</span> Product {params.id}</h2>
    </main>
  );
}
