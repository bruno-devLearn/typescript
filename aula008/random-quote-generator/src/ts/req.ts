import axios from "axios"
import { QuoteProps } from "./interface"

export async function getData(): Promise<QuoteProps[]> {
  try {
    const response = await axios.get("http://localhost:4000/quotes")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
