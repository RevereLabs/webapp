import '../styles/globals.css'
import NavBar from '../components/Navbar'
import { BlockchainProvider } from "../context/BlockchainContext.tsx";

function MyApp({ Component, pageProps }) {
    return(
        <>
            <BlockchainProvider>

                <NavBar/>
                <Component {...pageProps}
                    className="bg-accent"/>

            </BlockchainProvider>

        </>
    )
}

export default MyApp;
