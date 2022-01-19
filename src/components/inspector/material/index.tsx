import {
    Box,
    Flex, HStack, Text, VStack
} from '@chakra-ui/react'
import { BsDot } from 'react-icons/bs'

const Material = () => {
    return (
        <Flex
            w="full"
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
                        >Material</Text>
                    </HStack>
                </Flex>

                <VStack
                    w="full"
                    spacing="0px"
                    bgColor="gray.800"
                >
                    <HStack
                        w="full"
                    >
                        <HStack>
                            <Box
                                boxSize="20px"
                                bgColor="red"
                            />

                            <Text>color</Text>
                        </HStack>
                    </HStack>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Material