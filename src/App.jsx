import { useEffect, useState } from "react";
import SalesForm from "./pages/salesform";
import "./App.css";
const API_URL =
    import.meta.env.VITE_API_URL;

console.log(
    "API_URL:",
    API_URL
);

function App() {

    const [buyers, setBuyers] =
        useState([]);

    const [products, setProducts] =
        useState([]);

    const [trucks, setTrucks] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadInitialData();

    }, []);

    async function loadInitialData() {

        try {

            const [
                productsResponse,
                buyersResponse
            ] = await Promise.all([

                fetch(
                    `${API_URL}/api/products`
                ),

                fetch(
                    `${API_URL}/api/buyers`
                )

            ]);

            const productsData =
                await productsResponse.json();

            const buyersData =
                await buyersResponse.json();

            setProducts(

                productsData.map(
                    product =>
                        product.name
                )

            );

            setBuyers(

                buyersData.map(
                    buyer =>
                        buyer.name
                )

            );

        } catch (error) {

            console.error(
                "Failed to load data:",
                error
            );

        } finally {

            setLoading(
                false
            );

        }

    }

    if (loading) {

        return (

            <div className="loading-screen">

                <div className="loader"></div>

                <h2>
                    Starting Server...
                </h2>

                <p>
                    Loading products and buyers.
                    Please wait.
                </p>

            </div>

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