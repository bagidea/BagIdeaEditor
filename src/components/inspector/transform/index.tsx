import {
    Flex,
    HStack,
    Input,
    Text,
    VStack
} from "@chakra-ui/react"

import { BsDot } from "react-icons/bs"
import TransformObject from "./transform_object"

const Transform = () => {
    return (
        <Flex
            w="full"
            h="50px"
            padding="3px"
        >
            <VStack
                w="full"
                spacing="0px"
            >
                <Flex
                    w="full"
                    h="full"
                    alignItems="center"
                    padding="10px"
                    bgColor="gray.700"
                >
                    <HStack>
                        <BsDot />

                        <Text
                            fontSize="16px"
                            color="gray.200"
                        >Transform</Text>
                    </HStack>
                </Flex>

                <VStack
                    w="full"
                    spacing="0px"
                    bgColor="gray.800"
                >
                    <TransformObject text="position" />
                    <TransformObject text="rotation" />
                    <TransformObject text="scale" />
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Transform