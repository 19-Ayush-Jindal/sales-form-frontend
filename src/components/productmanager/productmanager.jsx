import { useEffect, useState } from "react";
import "./productmanager.css";

function ProductManager({
    onClose
}) {

    const [products, setProducts] =
        useState([]);

    const [newProduct, setNewProduct] =
        useState("");
    const API_URL = import.meta.env.VITE_API_URL;
    async function loadProducts() {

        const response =
            await fetch(
                `${API_URL}/api/products`
            );

        const data =
            await response.json();

        setProducts(data);

    }

    useEffect(() => {
        loadProducts();
    }, []);

    async function addProduct() {

        if (!newProduct.trim()) {
            return;
        }

        await fetch(
            `${API_URL}/api/products`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    name: newProduct
                })
            }
        );

        setNewProduct("");

        loadProducts();

    }

    async function deleteProduct(id) {

        await fetch(
            `${API_URL}/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        loadProducts();

    }

    return (

        <div className="admin-overlay">

            <div className="product-manager">

                <h2>
                    Manage Products
                </h2>

                <div className="add-row">

                    <input
                        value={newProduct}
                        onChange={event =>
                            setNewProduct(
                                event.target.value
                            )
                        }
                        placeholder="Product Name"
                    />

                    <button
                        type="button"
                        onClick={addProduct}
                    >
                        Add
                    </button>

                </div>

                {
                    products.map(product => (

                        <div
                            key={product.id}
                            className="product-item"
                        >

                            <span>
                                {product.name}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    deleteProduct(
                                        product.id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))
                }

                <button
                    type="button"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

        </div>

    );

}

export default ProductManager;