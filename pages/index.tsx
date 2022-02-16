import {
    Flex,
    HStack,
    VStack
} from '@chakra-ui/react'
import { useEffect } from 'react'

import Assets from '../src/components/assets'
import Display from '../src/components/display'
import Header from '../src/components/header'
import Inspector from '../src/components/inspector'
import Scene from '../src/components/scene'

const Index = () => {
    useEffect(() => {
        document.title = "BagIdea Editor"
    }, [])

    return (
        <Flex
            w="100vw"
            h="100vh"
            overflow="hidden"
        >
            <VStack spacing="5px">
                <Header />

                <HStack
                    w="100vw"
                    h="full"
                    overflow="hidden"
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
                    <Inspector />
                </HStack>
            </VStack>
        </Flex>
    )
}

export default Index