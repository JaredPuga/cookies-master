import Head from "next/head"
import { NavBar } from "../ui"

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({children}:Props) => {
  return (
    <>
        <Head>

        </Head>
        <nav>
          <NavBar />
        </nav>
        <main style={{padding: '20px 50px'}}>
            { children }
        </main>
    </>
  )
}
