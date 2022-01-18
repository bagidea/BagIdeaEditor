import {
    Flex,
    Text,
    VStack
} from '@chakra-ui/react'

import { RiAddCircleLine } from 'react-icons/ri'

const Assets = () => (
    <Flex
        w="100%"
        minH="250px"
        padding="10px"
        bgColor="gray.900"
    >
        <Flex
            margin="5px"
            w="100px"
            h="100px"
            border="5px dashed"
            borderColor="blue.900"
            alignItems="center"
            justifyContent="center"
        >
            <RiAddCircleLine
                size="50px"
                color="#2c5282"
            />
        </Flex>

        <VStack
            margin="5px"
            spacing="5px"
        >
            <Flex
                w="100px"
                h="100px"
                bgColor="gray.800"
            >
            </Flex>

            <Text>Material</Text>
        </VStack>
    </Flex>
)

export default Assets