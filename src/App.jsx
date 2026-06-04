import { useEffect, useState } from "react";
import SalesForm from "./pages/salesform";
const API_URL =
    import.meta.env.VITE_API_URL;

console.log(
    "API_URL:",
    API_URL
);
function App() {

    const [buyers, setBuyers] = useState([]);
    const [products, setProducts] = useState([]);
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {

        loadProducts();
        loadBuyers();

    }, []);

    async function loadProducts() {

        const response =
            await fetch(
                `${API_URL}/api/products`
                // "https://sales-form-backend.onrender.com/api/products"
            );

        const data =
            await response.json();

        setProducts(
            data.map(
                product => product.name
            )
        );

    }

    async function loadBuyers() {

        const response =
            await fetch(
                `${API_URL}/api/buyers`
                // "https://sales-form-backend.onrender.com/api/buyers"
            );

        const data =
            await response.json();

        setBuyers(
            data.map(
                buyer => buyer.name
            )
        );

    }

    return (

        <SalesForm
            buyers={buyers}
            trucks={trucks}
            products={products}
        />

    );

}

export default App;