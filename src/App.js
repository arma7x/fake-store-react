import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, storeProducts } from './database'
import { FakeStore } from './api'

function App() {
  
  // const loading = useSelector((state) => state.database.loading)
  const products = useSelector((state) => state.database.products)
  const dispatch = useDispatch()
 
  useEffect(() => {
    document.title = "Fake Store"
    if (products.length === 0) {
      fetchProducts()
    }
  },[]);
  
  const fetchProducts = () => {
    dispatch(setLoading(true))
    FakeStore.getProducts()
    .then((_products) => {
      dispatch(storeProducts(_products))
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
  }

  return (
    <div>
      {
        products.map((product) =>
          <Link key={product.id.toString()} to={'/product/' + product.id.toString()}>{product.title.toString()}</Link>
        )
      }
    </div>
  );
}

export default App;
