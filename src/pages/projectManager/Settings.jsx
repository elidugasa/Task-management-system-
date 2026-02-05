import React, { useState } from "react";

const Settings = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement save settings logic (API call)
        alert("Settings saved!");
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto" }}>
            <h2>Project Manager Settings</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;