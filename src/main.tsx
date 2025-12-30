import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import './i18n.ts'

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider>
            <React.Suspense fallback="loading">
                <App />
            </React.Suspense>
        </Provider>
    </React.StrictMode>,
)