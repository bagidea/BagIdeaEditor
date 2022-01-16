import {
    Flex,
    HStack,
    Text
} from "@chakra-ui/react"
import TransformInput from "./transform_input"

const TransformObject: React.FC<{ text: string }> = ({ text }) => {
    return (
        <HStack
            w="full"
            h="40px"
        >
            <Flex
                w="80px"
                pr="5px"
                justifyContent="right"
            >
                <Text
                    fontSize="16px"
                    color="gray.200"
                >{ text }:</Text>
            </Flex>

            <HStack>
                <TransformInput text="x" />
                <TransformInput text="y" />
                <TransformInput text="z" />
            </HStack>
        </HStack>
    )
}

export default TransformObject