import Head from "next/head"

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({children}:Props) => {
  return (
    <>
        <Head>

        </Head>
        <nav>

        </nav>
        <main style={{padding: '20px 50px'}}>
            { children }
        </main>
    </>
  )
}
