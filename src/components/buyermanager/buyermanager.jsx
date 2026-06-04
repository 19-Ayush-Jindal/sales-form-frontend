import { useEffect, useState } from "react";
import "./buyermanager.css";

function BuyerManager({
    onClose
}) {

    const [buyers, setBuyers] =
        useState([]);

    const [newBuyer, setNewBuyer] =
        useState("");

    async function loadBuyers() {

        const response =
            await fetch(
                "http://192.168.0.114:3001/api/buyers"
            );

        const data =
            await response.json();

        setBuyers(data);

    }

    useEffect(() => {
        loadBuyers();
    }, []);

    async function addBuyer() {

        if (!newBuyer.trim()) {
            return;
        }

        await fetch(
            "http://192.168.0.114:3001/api/buyers",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    name: newBuyer
                })
            }
        );

        setNewBuyer("");

        loadBuyers();

    }

    async function deleteBuyer(id) {

        await fetch(
            `http://192.168.0.114:3001/api/buyers/${id}`,
            {
                method: "DELETE"
            }
        );

        loadBuyers();

    }

    return (

        <div className="admin-overlay">

            <div className="buyer-manager">

                <h2>
                    Manage Buyers
                </h2>

                <div className="add-row">

                    <input
                        value={newBuyer}
                        onChange={event =>
                            setNewBuyer(
                                event.target.value
                            )
                        }
                        placeholder="Buyer Name"
                    />

                    <button
                        type="button"
                        onClick={addBuyer}
                    >
                        Add
                    </button>

                </div>

                {
                    buyers.map(buyer => (

                        <div
                            key={buyer.id}
                            className="buyer-item"
                        >

                            <span>
                                {buyer.name}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    deleteBuyer(
                                        buyer.id
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

export default BuyerManager;