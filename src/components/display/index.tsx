import {
    Flex,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from '@chakra-ui/react'

import { BsFillCameraReelsFill } from 'react-icons/bs'
import { GiMushrooms } from 'react-icons/gi'
import Scene from './scene'

const tabStyle = {
    _selected: {
        bg: "blue.700"
    },
    _focus: {
        boxShadow: "none"
    }
}

const Display = () => (
    <Flex
        w="full"
        h="full"
        bgColor="gray.900"
    >
        <Tabs
            w="full"
            h="full"
            isFitted
        >
            <TabList>
                <Tab { ...tabStyle }>
                    <HStack>
                        <GiMushrooms />
                        <Text>Scene</Text>
                    </HStack>
                </Tab>
                <Tab { ...tabStyle } isDisabled>
                    <HStack>
                        <BsFillCameraReelsFill />
                        <Text>Preview</Text>
                    </HStack>
                </Tab>
            </TabList>
            <TabPanels
                w="full"
                h="full"
            >
                <TabPanel
                    w="full"
                    h="93.5%"
                    padding="5px"
                >
                    <Scene />
                </TabPanel>
                <TabPanel
                    w="100%"
                    h="93.5%"
                    padding="5px"
                >
                    Render
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Flex>
)

export default Display