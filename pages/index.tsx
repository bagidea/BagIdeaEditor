import {
    Flex,
    HStack,
    VStack
} from '@chakra-ui/react'

import Assets from '../src/components/assets'
import Display from '../src/components/display'
import Header from '../src/components/header'
import Properties from '../src/components/inspector'
import Scene from '../src/components/scene'

const Index = () => (
    <Flex
        w="100vw"
        h="100vh"
    >
        <VStack spacing="5px">
            <Header />

            <HStack
                w="100vw"
                h="full"
            >
                <VStack
                    w="full"
                    h="full"
                >
                    <HStack
                        w="full"
                        h="full"
                    >
                        <Scene />
                        <Display />
                    </HStack>
                    <Assets />
                </VStack>
                <Properties />
            </HStack>
        </VStack>
    </Flex>
)

export default Index