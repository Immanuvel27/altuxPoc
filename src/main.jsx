import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { loadConfig } from "./Services/appConfig"
import "./index.css"

(async () => {
  try {
    console.log("Loading config...")
    await loadConfig()
    console.log("Config loaded successfully")
    
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } catch (error) {
    console.error("Failed to load config:", error)
    ReactDOM.createRoot(document.getElementById("root")).render(
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h1>Error Loading Application</h1>
        <p>{error.message}</p>
      </div>
    )
  }
})()