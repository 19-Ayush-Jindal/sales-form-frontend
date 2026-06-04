import { useState } from "react";
import SearchableDropdown from "../components/searchabledropdown/searchabledropdown";
import "./salesform.css";
import AdminPanel from "../components/adminpanel/adminpanel.jsx";
import  "../components/adminpanel/adminpanel.css";
import AdminDashboard
from "../components/admindashboard/admindashboard.jsx";

import ProductManager
from "../components/productmanager/productmanager";

import BuyerManager
from "../components/buyermanager/buyermanager";
function SalesForm({
    buyers,
    trucks,
    products
}) {

    const [sale, setSale] = useState({
        buyerName: "",
        truckNumber: "",
        date: new Date().toISOString().split("T")[0],
        saleType:"FOR",
        items: [
        {
            // id: crypto.randomUUID(),
            id: Date.now().toString(),
            product: "",
            quantity: "",
            price: ""
        }
]
    });

    const [showAdmin, setShowAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showBuyers, setShowBuyers] = useState(false);
    const [errors, setErrors] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;
    function addProductRow() {

        setSale(prev => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    // id: crypto.randomUUID(),
                    id: Date.now().toString(),
                    product: "",
                    quantity: "",
                    price: ""
                }
            ]
        }));

    }

    function removeProductRow(id) {

        if (sale.items.length === 1) {

            setSale(prev => ({
                ...prev,
                items: [
                    {
                        ...prev.items[0],
                        product: "",
                        quantity: "",
                        price: ""
                    }
                ]
            }));

            return;
        }

        setSale(prev => ({
            ...prev,
            items: prev.items.filter(
                item => item.id !== id
            )
        }));

    }

    function updateProduct(id, value) {

        setSale(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id
                    ? {
                          ...item,
                          product: value
                      }
                    : item
            )
        }));

    }

    function updateQuantity(id, value) {

    if (
        value !== "" &&
        !/^\d*\.?\d*$/.test(value)
    ) {
        return;
    }

    setSale(prev => ({
        ...prev,
        items: prev.items.map(item =>
            item.id === id
                ? {
                      ...item,
                      quantity: value
                  }
                : item
        )
    }));

}

function updatePrice(id, value) {

    if (
        value !== "" &&
        !/^\d*\.?\d*$/.test(value)
    ) {
        return;
    }

    setSale(prev => ({
        ...prev,
        items: prev.items.map(item =>
            item.id === id
                ? {
                      ...item,
                      price: value
                  }
                : item
        )
    }));

}

    async function handleSubmit(event) {

    event.preventDefault();

    const newErrors = {};

    const validBuyer =
        buyers.includes(
            sale.buyerName
        );

    if (!validBuyer) {

        newErrors.buyerName =
            "Please select a buyer from the list";

    }

    if (!sale.saleType) {

        newErrors.saleType =
            "Sale Type is required";

    }

    sale.items.forEach(
        (item, index) => {

            const validProduct =
                products.includes(
                    item.product
                );

            if (!validProduct) {

                newErrors[
                    `product-${index}`
                ] =
                    "Please select a product from the list";

            }

            if (
                !item.quantity ||
                Number(item.quantity) <= 0
            ) {

                newErrors[
                    `quantity-${index}`
                ] =
                    "Enter valid quantity";

            }

            if (
                !item.price ||
                Number(item.price) <= 0
            ) {

                newErrors[
                    `price-${index}`
                ] =
                    "Enter valid price";

            }

        }
    );

    if (
        Object.keys(
            newErrors
        ).length > 0
    ) {

        setErrors(
            newErrors
        );

        return;

    }

    setErrors({});

    try {

        const response =
            await fetch(

                `${API_URL}/api/sales`,

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            sale
                        )
                }

            );

        if (
            !response.ok
        ) {

            throw new Error(
                "Failed to save sale"
            );

        }

        const data =
            await response.json();

        if (
            data.success
        ) {

            alert(
                "Sale Saved Successfully"
            );

            setSale({

                buyerName: "",

                saleType: "FOR",

                truckNumber: "",

                date:
                    new Date()
                        .toISOString()
                        .split("T")[0],

                items: [
                    {
                        id:
                            Date.now().toString(),

                        product: "",

                        quantity: "",

                        price: ""
                    }
                ],

                remarks: ""

            });

            setErrors({});

        } else {

            throw new Error(
                data.message ||
                "Failed to save sale"
            );

        }

    } catch (error) {

        console.error(
            "Submit error:",
            error
        );

        alert(
            "Failed To Save"
        );

    }

}



    return (

        <div className="page">

            

            <form
                className="sales-form"
                onSubmit={handleSubmit}
            >

                <h1>New Sale</h1>

                <div className="form-row">

                    <div className="field">

                        <label>Buyer Name</label>

                        <SearchableDropdown
                            data={buyers}
                            value={sale.buyerName}
                            onChange={value =>
                                setSale(prev => ({
                                    ...prev,
                                    buyerName: value
                                }))
                            }
                        />
                        {errors.buyerName && (
        <div className="field-error">
            {errors.buyerName}
        </div>
    )}

                    </div>
                    

                    {/* <div className="field">

                        <label>Truck Number</label>

                        <SearchableDropdown
                            data={trucks}
                            value={sale.truckNumber}
                            onChange={value =>
                                setSale(prev => ({
                                    ...prev,
                                    truckNumber: value
                                }))
                            }
                        />

                    </div> */}
                    <input
        type="date"
        value={sale.date}
        onChange={event =>
            setSale(prev => ({
                ...prev,
                date: event.target.value
            }))
        }
    />

                </div>

                <div className="section-header">
                    Products
                </div>

                {sale.items.map((item, index) => (

    <div
        className="product-row"
        key={item.id}
    >

        <div className="field">

            <label>Product</label>

            <SearchableDropdown
                data={products}
                value={item.product}
                onChange={value =>
                    updateProduct(
                        item.id,
                        value
                    )
                }
            />

            {
                errors[
                    `product-${index}`
                ] && (

                    <div className="field-error">
                        {
                            errors[
                                `product-${index}`
                            ]
                        }
                    </div>

                )
            }

        </div>

        <div className="field quantity-field">

            <label>Quantity</label>

            <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={item.quantity}
                onChange={event =>
                    updateQuantity(
                        item.id,
                        event.target.value
                    )
                }
            />

            {
                errors[
                    `quantity-${index}`
                ] && (

                    <div className="field-error">
                        {
                            errors[
                                `quantity-${index}`
                            ]
                        }
                    </div>

                )
            }

        </div>

        <div className="field price-field">

            <label>Price</label>

            <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={item.price}
                onChange={event =>
                    updatePrice(
                        item.id,
                        event.target.value
                    )
                }
            />

            {
                errors[
                    `price-${index}`
                ] && (

                    <div className="field-error">
                        {
                            errors[
                                `price-${index}`
                            ]
                        }
                    </div>

                )
            }

        </div>

        <button
            type="button"
            className="remove-btn"
            onClick={() =>
                removeProductRow(
                    item.id
                )
            }
        >
            ×
        </button>

    </div>

))}

                <button
                    type="button"
                    className="add-btn"
                    onClick={addProductRow}
                >
                    + Add Product
                </button>


<div className="sale-type-section">

    <label className="sale-type-label">
        Sale Type
    </label>

    <div className="sale-type-options">

        <label>

            <input
                type="radio"
                name="saleType"
                value="FOR"
                checked={
                    sale.saleType === "FOR"
                }
                onChange={event =>
                    setSale({
                        ...sale,
                        saleType:
                            event.target.value
                    })
                }
            />

            FOR

        </label>

        <label>

            <input
                type="radio"
                name="saleType"
                value="XFactory"
                checked={
                    sale.saleType ===
                    "XFactory"
                }
                onChange={event =>
                    setSale({
                        ...sale,
                        saleType:
                            event.target.value
                    })
                }
            />

            XFactory

        </label>

    </div>

    {
        errors.saleType && (

            <div className="field-error">
                {errors.saleType}
            </div>

        )
    }

</div>
<div className="field">

    <label>Remarks</label>

    <textarea
        value={sale.remarks}
        onChange={event =>
            setSale(prev => ({
                ...prev,
                remarks: event.target.value
            }))
        }
    />

</div>


                <div className="footer">

    <button
        type="button"
        className="admin-btn"
        onClick={() => setShowAdmin(true)}
    >
        Admin
    </button>

    <button
        type="submit"
        className="save-btn"
    >
        Save Sale
    </button>

</div>

            </form>

            {showAdmin && (
        <AdminPanel
    onClose={() =>
        setShowAdmin(false)
    }
    onLoginSuccess={() => {

    setIsAdmin(true);

    setShowAdmin(false);

    setShowDashboard(true);

}}
/>
    )}

    {
    showDashboard &&
    (
        <AdminDashboard

    onClose={() =>
        setShowDashboard(false)
    }

    onManageProducts={() =>
        setShowProducts(true)
    }

    onManageBuyers={() =>
        setShowBuyers(true)
    }

    onManageTrucks={() => {}}

/>
    )
}

{
    showProducts &&
    (
        <ProductManager
            onClose={() =>
                setShowProducts(false)
            }
        />
    )
}
{
    showProducts &&
    (
        <ProductManager
            onClose={() =>
                setShowProducts(false)
            }
        />
    )
}

{
    showBuyers &&
    (
        <BuyerManager
            onClose={() =>
                setShowBuyers(false)
            }
        />
    )
}

        </div>

    );

}

export default SalesForm;