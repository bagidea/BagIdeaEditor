import {
    HStack,
    Input,
    Text
} from "@chakra-ui/react"

const TransformInput: React.FC<{ text: string, value: number }> = ({ text, value }) => {
    return (
        <HStack
            alignItems="center"
            justifyContent="center"
        >
            <Text
                fontSize="16px"
                color="gray.200"
            >{ text }</Text>
            <Input
                w="60px"
                h="30px"
                type="number"
                padding="5px"
                defaultValue={ value }
            />
        </HStack>
    )
}

export default TransformInput