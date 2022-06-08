import React, { useEffect, useState } from "react"
import IntroViewComponent from "./Components/IntroView/IntroViewComponent"
import DashboardComponent from "./Components/Dashboard/DashboardComponent"
import * as SecureStore from "expo-secure-store"

export default function App() {
     // State to store user's credentials
     const [ credentials, setCredentials ] = useState(null)
     
     // Conditionally render based on user's credentials
     if(credentials === null) return <IntroViewComponent />
     else return <DashboardComponent />
}