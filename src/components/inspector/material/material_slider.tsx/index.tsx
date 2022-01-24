import {
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

import { MutableRefObject, useRef, useState } from 'react'

const MaterialSlider: React.FC<{ text: string, value: number }> = ({ text, value }) => {
    const input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const [sliderValue, setSliderValue] = useState(value)
    const [showTooltip, setShowTooltip] = useState(false)

    const sliderChange = (e) => {
        setSliderValue(e)
        input.current.value = (e/100).toFixed(2)
    }

    return (
        <VStack
            w="full"
            pl="67px"
            pr="15px"
            alignItems="left"
            spacing="0px"
        >
            <Text>{ text }</Text>

            <HStack
                w="full"
                pb="15px"
            >
                <Slider
                    aria-label="slider-ex-1"
                    defaultValue={ 50 }
                    onChange={ sliderChange }
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
                    defaultValue={ (value/100).toFixed(2) } 
                    ref={ input }
                />
            </HStack>
        </VStack>
    )
}

export default MaterialSlider