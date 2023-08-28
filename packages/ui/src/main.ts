import App from "./App.svelte"
import "./base.scss";

const app = new App({
  target: document.getElementById("pickle-app")!,
})

export default app
