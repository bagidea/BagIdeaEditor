import {
    Box,
    Flex,
    HStack,
    Input,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Text,
    Tooltip,
    VStack
} from '@chakra-ui/react'
import { useState } from 'react'

import { BsDot } from 'react-icons/bs'
import MaterialAndMap from './material_and_map'

const Material = () => {
    const [sliderValue, setSliderValue] = useState(50)
    const [showTooltip, setShowTooltip] = useState(false)

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
                        <VStack
                            w="full"
                            pl="67px"
                            pr="15px"
                            alignItems="left"
                            spacing="0px"
                        >
                            <Text>BumpScale</Text>

                            <HStack
                                w="full"
                                pb="15px"
                            >
                                <Slider
                                    aria-label="slider-ex-1"
                                    defaultValue={ 50 }
                                    onChange={(v) => setSliderValue(v)}
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                >
                                    <SliderMark value={ 0 } mt='1' ml='2px' fontSize='sm'>0.0</SliderMark>
                                    <SliderMark value={ 100 } mt='1' ml='-20px' fontSize='sm'>1.0</SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg='teal.500'
                                        color='white'
                                        placement='top'
                                        isOpen={showTooltip}
                                        label={ (sliderValue/100).toFixed(2) }
                                    >
                                        <SliderThumb
                                            boxSize="10px"
                                            _focus={ { boxShadow: "0px" } }
                                        />
                                    </Tooltip>
                                </Slider>

                                <Input
                                    w="50px"
                                    h="30px"
                                    px="0px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    value={ (sliderValue/100).toFixed(2) } 
                                />
                            </HStack>
                        </VStack>

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