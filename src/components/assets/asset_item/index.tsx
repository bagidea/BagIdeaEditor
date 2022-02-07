import {
    Flex,
    Image,
    Text,
    VStack
} from "@chakra-ui/react"

const AssetItem: React.FC<{ name: string, pic: string }> = ({ name, pic }) => (
    <VStack
        margin="5px"
        spacing="5px"
        cursor="pointer"
    >
        <Flex
            w="100px"
            h="100px"
            bgColor="gray.800"
            _hover={ { bgColor: "gray.700" } }
        >
            <Image
                src={ pic }
                w="100px"
                h="100px"
            />
        </Flex>

        <Flex
            w="100px"
            justifyContent="center"
        >
            <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >{ name }</Text>
        </Flex>
    </VStack>
)

export default AssetItem