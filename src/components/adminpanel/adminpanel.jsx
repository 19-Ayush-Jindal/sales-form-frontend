import { useState } from "react";
import "./adminpanel.css";

function AdminPanel({
    onClose,
    onLoginSuccess
}) {

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleLogin() {

    try {

        setError("");

        const response = await fetch(
            "http://localhost:3001/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    password
                })
            }
        );

        const data =
            await response.json();

        console.log(response.status);
        console.log(data);

        if (response.ok) {

            onLoginSuccess();
//             console.log("LOGIN SUCCESS");
// alert("LOGIN SUCCESS");

            return;

        }

        setError(
            "Invalid Password"
        );

    } catch (error) {

        console.error(error);

        setError(
            "Could not connect to server"
        );

    }

}

    return (

        <div className="admin-overlay">

            <div className="admin-modal">

                <h2>
                    Admin Login
                </h2>

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={event =>
                        setPassword(
                            event.target.value
                        )
                    }
                />

                {
                    error &&
                    (
                        <p className="error">
                            {error}
                        </p>
                    )
                }

                <div className="admin-actions">

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleLogin
                        }
                        disabled={
                            loading
                        }
                    >
                        {
                            loading
                                ? "Checking..."
                                : "Login"
                        }
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AdminPanel;