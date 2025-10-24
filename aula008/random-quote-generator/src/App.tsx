import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import { getData } from "./ts/req"
import { useEffect, useState } from "react"
import { QuoteProps } from "./ts/interface"
import "./App.css"

function App() {
  const [data, setData] = useState<QuoteProps[]>([])
  const [index, setIndex] = useState(0)

  const [encodedQuote, setEncodedQuote] = useState("")

  const twitterLink = `https://x.com/intent/post?text=${encodedQuote}`
  const whatsappLink = `https://api.whatsapp.com/send/?text=${encodedQuote}&type=custom_url&app_absent=0`

  // Busca os dados só uma vez
  useEffect(() => {
    async function fetcher() {
      const dt = await getData()
      setData(dt)
    }
    fetcher()
  }, [])

  // Atualiza o texto e o encode sempre que o índice ou os dados mudarem
  useEffect(() => {
    if (data.length > 0) {
      const text = `${data[index]?.quote}\n- ${data[index]?.author}`
      setEncodedQuote(encodeURIComponent(text))
    }
  }, [data, index])

  function handleClick(operation: string) {
    if (data.length === 0) return

    if (operation === "next" && index < data.length - 1) {
      setIndex((prev) => prev + 1)
    } else if (operation === "prev" && index > 0) {
      setIndex((prev) => prev - 1)
    }
  }

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          <div className="quote">
            <p>{data[index]?.quote}</p>
            <span>- {data[index]?.author}</span>
          </div>
          <div className="bottom-navigation">
            <div>
              <Button
                className={classnames("rotate cp")}
                onClick={() => handleClick("prev")}
              />
              <Button className="cp" onClick={() => handleClick("next")} />
            </div>
            <div className="share">
              <span>Share At:</span>
              <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                <Twitter title="Post this quote on twitter!" className="cp" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App
