import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, storeProducts, searchProducts } from '../store/database'
import { FakeStore } from '../api'
import ProductWidget from '../widgets/ProductWidget'

function App() {

  let searchT = -1;

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

  const onChangeSearchInput = (evt) => {
    let txt = document.getElementById('searchInput').value.trim().toLowerCase().toString();
    if (searchT > 0) {
      clearTimeout(searchT)
      searchT = -1
    }
    searchT = setTimeout(() => {
      console.log(txt.toString());
      dispatch(searchProducts(txt))
    }, 500);
  }

  return (
    <div>
      <div className="container">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col mb-2">
              <button className="btn btn-primary" onClick={() => fetchProducts()}>Refresh</button>
            </div>
            <div className="col mb-2 d-grid d-flex justify-content-end">
              <div className="d-flex m-0">
                <input id="searchInput" className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={onChangeSearchInput}/>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
          {
            products.map((product) =>
              <div key={product.id.toString()} className="col col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <ProductWidget metadata={product} />
              </div>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
