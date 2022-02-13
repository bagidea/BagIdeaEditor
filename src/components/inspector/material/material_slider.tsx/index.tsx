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

import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react'
import { MeshPhysicalMaterial } from 'three'

const MaterialSlider: React.FC<{
        text: string,
        value: number,
        setBack?: Dispatch<SetStateAction<number>>
        material: MeshPhysicalMaterial,
        type: string
    }> = ({ text, value, setBack, material, type }) =>
{
    const input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const [sliderValue, setSliderValue] = useState(100*value)
    const [showTooltip, setShowTooltip] = useState(false)

    if(sliderValue != 100*value) setSliderValue(100*value)

    const sliderChange = (e) => {
        setSliderValue(e)
        input.current.value = (e/100).toFixed(2)

        switch(type)
        {
            case "bump_map_scale":
                material.bumpScale = value = e/100
                if(!!setBack) setBack(material.bumpScale)
                break
            case "metalness":
                material.metalness = value = e/100
                if(!!setBack) setBack(material.metalness)
                break
        }
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
                spacing="15px"
            >
                <Slider
                    aria-label="slider-ex-1"
                    value={ sliderValue }
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
                    defaultValue={ (value).toFixed(2) } 
                    ref={ input }
                />
            </HStack>
        </VStack>
    )
}

export default MaterialSlider