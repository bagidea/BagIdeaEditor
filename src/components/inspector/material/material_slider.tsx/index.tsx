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

import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useRef,
    useState
} from 'react'

import { MeshPhysicalMaterial } from 'three'
import { SceneCanvas } from '../../../display/scene/canvas'

const MaterialSlider: React.FC<{
        text: string,
        value: number,
        setBack: Dispatch<SetStateAction<number>>
        material: MeshPhysicalMaterial,
        type: string,
        scene: SceneCanvas
    }> = ({ text, value, setBack, material, type, scene }) =>
{
    const input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const [sliderValue, setSliderValue] = useState(100*value)
    const [showTooltip, setShowTooltip] = useState(false)

    if(sliderValue != 100*value) setSliderValue(100*value)

    const updateAll = (e) => {
        switch(type)
        {
            case "bump_map_scale":
                material.bumpScale = e
                setBack(material.bumpScale)
                break
            case "metalness":
                material.metalness = e
                setBack(material.metalness)
                break
            case "roughness":
                material.roughness = e
                setBack(material.roughness)
                break
            case "clearcoat":
                material.clearcoat = e
                setBack(material.clearcoat)
                break
            case "clearcoat_roughness":
                material.clearcoatRoughness = e
                setBack(material.clearcoatRoughness)
                break
            case "sheen_roughness":
                material.sheenRoughness = e
                setBack(material.sheenRoughness)
                break
            case "transmission":
                material.transmission = e
                setBack(material.transmission)
                break
            default:
                console.log("invalid material type")
        }
    }

    const picRender = () => {
        //console.log(scene.engine.screenRender.render(material))
    }

    const sliderChange = (e) => {
        setSliderValue(e)
        input.current.value = (e / 100).toFixed(2)
        updateAll(e / 100)
    }

    const inputChange = () => {
        //console.log(input.current.value)
        setSliderValue(100 * parseFloat(input.current.value))
        updateAll(parseFloat(input.current.value))
        picRender()
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
                    onChangeEnd={ () => picRender() }
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
                    type="number"
                    focusBorderColor="gray.400"
                    textAlign="center"
                    defaultValue={ (value).toFixed(2) } 
                    onBlur={ inputChange }
                    onKeyPress={ (e) => { if(e.key == "Enter") inputChange() } }
                    ref={ input }
                />
            </HStack>
        </VStack>
    )
}

export default MaterialSlider