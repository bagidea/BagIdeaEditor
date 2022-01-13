import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

const colors = {
    background: {
        100: "#f2f3f4",
        200: "#e5e7e9",
        300: "#d7dbdd",
        400: "#cacfd2",
        500: "#bdc3c7",
        600: "#a6acaf",
        700: "#909497",
        800: "#797d7f",
        900: "#626567"
    }
}

export const theme = extendTheme({
    ...baseTheme,
    colors
})