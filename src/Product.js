import { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, pushProductsRegistry } from './database'
import { FakeStore } from './api'

export default function Product() {

  let params = useParams();
  const cachedProduct = useSelector((state) => state.database.productsRegistry[params.id])
  const dispatch = useDispatch()

  useEffect(() => {
    if (cachedProduct == null) {
      dispatch(setLoading(true))
      FakeStore.getProduct(params.id)
      .then((product) => {
        dispatch(pushProductsRegistry(product))
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    }
  },[]);
  
  return (
    <div>
      { cachedProduct != null && <h2 className="text-center">Product {cachedProduct.title}</h2> }
    </div>
  );
}
