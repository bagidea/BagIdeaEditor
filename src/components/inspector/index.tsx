import {
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react"

import { ImEqualizer } from "react-icons/im"
import Transform from "./transform"

const Inspector = () => {
    return (
        <Flex
            minW="350px"
            h="full"
            bgColor="gray.900"
        >
            <VStack
                w="full"
                spacing="3px"
            >
                <Flex
                    w="full"
                    h="50px"
                    bgColor="purple.800"
                    alignItems="center"
                    flexWrap="wrap"
                    pl="10px"
                >
                    <HStack>
                        <ImEqualizer size="20px" />

                        <Text
                            fontSize="20px"
                        >Inspector</Text>
                    </HStack>
                </Flex>

                <Transform />
            </VStack>
        </Flex>
    )
}

export default Inspector