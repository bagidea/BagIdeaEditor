import {
    Box,
    Flex,
    HStack,
    Text,
    VStack
} from '@chakra-ui/react'

import { BsDot } from 'react-icons/bs'
import MaterialAndMap from './material_and_map'

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
                    py="10px"
                    w="full"
                    spacing="15px"
                    bgColor="gray.800"
                >
                    <VStack
                        w="full"
                        spacing="5px"
                    >
                        <Text
                            fontSize="16px"
                            fontWeight="600"
                        >Standard</Text>
                        <MaterialAndMap text="Albedo" hasColor={ true } />
                        <MaterialAndMap text="Normal" />
                        <MaterialAndMap text="Bump" />
                        <MaterialAndMap text="Alpha" />
                        <MaterialAndMap text="Ambient Occusion" />
                        <MaterialAndMap text="Metalness" />
                        <MaterialAndMap text="Roughness" />
                        <MaterialAndMap text="Emissive" hasColor={ true } />
                        <MaterialAndMap text="Displacement" />
                        <MaterialAndMap text="Environment" />
                        <MaterialAndMap text="Light" />
                    </VStack>

                    <Box
                        w="90%"
                        h="2px"
                        bgColor="gray.700"
                    />

                    <VStack
                        w="full"
                        spacing="5px"
                    >
                        <Text
                            fontSize="16px"
                            fontWeight="600"
                        >Advance</Text>
                        <MaterialAndMap text="Clearcoat" />
                        <MaterialAndMap text="Clearcoat Normal" />
                        <MaterialAndMap text="Clearcoat Roughness" />
                        <MaterialAndMap text="SheenColor" hasColor={ true } />
                        <MaterialAndMap text="SheenRoughness" />
                        <MaterialAndMap text="Transmission" />
                    </VStack>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Material