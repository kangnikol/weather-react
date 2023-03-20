import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

// https://vitejs.dev/config/
export default ({ mode }) => {
  dotenv.config({ path: `.env.${mode}` })

  return defineConfig({
    plugins: [react()],
  })
}
