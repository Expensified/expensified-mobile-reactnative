import { AppRegistry } from "react-native"
import { name as AppName } from "./app.json"
import App from "./App"

// Registers App as the base component
AppRegistry.registerComponent(AppName, () => App)