import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { theme } from '../src/chakra-theme'
import store from '../src/redux/store'
import '../src/styles/color_palette_styles.css'

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
    <ChakraProvider theme={ theme }>
        <Provider store={ store }>
            <Component { ...pageProps } />
        </Provider>
    </ChakraProvider>
)

export default App