import {
    Box,
    Flex,
    HStack,
    Input,
    Spacer,
    Text,
    VStack
} from '@chakra-ui/react'

import {
    MeshPhysicalMaterial,
    Vector2
} from 'three'

import { BsDot } from 'react-icons/bs'
import { Asset, updatePic } from '../../../redux/slices/context_3d'
import { SceneCanvas } from '../../display/scene/canvas'
import MaterialAndMap from './material_and_map'
import MaterialSlider from './material_slider.tsx'
import { MutableRefObject, useRef, useState } from 'react'

const combindHex = (str: string): string => {
    while(str.length < 6) str = "0"+str
    return str
}

const Material: React.FC<{
        isSelect: boolean,
        scene: SceneCanvas
    }> = ({ isSelect, scene }) =>
{
    let buffer_material: MeshPhysicalMaterial = null

    let diffuse_color: string = ""

    const normal_map_scale_x_input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const normal_map_scale_y_input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const [normal_map_scale_x, setNormalMapScaleX] = useState(0)
    const [normal_map_scale_y, setNormalMapScaleY] = useState(0)

    const [bump_map_scale, setBumpMapScale] = useState(0)

    let ao_intensity: number = 1

    const [metalness, setMetalness] = useState(0)

    const [roughness, setRoughness] = useState(0)

    let emissive_color: string = ""

    const [clearcoat, setClearcoat] = useState(0)

    const [clearcoat_roughness, setClearcoatRoughness] = useState(0)

    let sheen_color: string = ""
    const [sheen_roughness, setSheenRoughness] = useState(0)

    const [transmission, setTransmission] = useState(0)

    if(!!scene) {
        if(scene.lastSelectedAsset != -1) {
            const asset: Asset = (scene.projectAssets[scene.lastSelectedAsset] as any).asset as Asset

            if(!!asset) {
                if(asset.isSelect && asset.type == "material") {
                    const material: MeshPhysicalMaterial = scene.engine.materials.find((v: MeshPhysicalMaterial) => v.id == asset.index)

                    if(!!material) {
                        buffer_material = material

                        diffuse_color = "#"+combindHex(material.color.getHex().toString(16))

                        if(normal_map_scale_x != material.normalScale.x) setNormalMapScaleX(material.normalScale.x)
                        if(normal_map_scale_y != material.normalScale.y) setNormalMapScaleY(material.normalScale.y)

                        if(bump_map_scale != material.bumpScale) setBumpMapScale(material.bumpScale)

                        ao_intensity = material.aoMapIntensity

                        if(metalness != material.metalness) setMetalness(material.metalness)

                        if(roughness != material.roughness) setRoughness(material.roughness)

                        emissive_color = "#"+combindHex(material.emissive.getHex().toString(16))

                        if(clearcoat != material.clearcoat) setClearcoat(material.clearcoat)
                        if(clearcoat_roughness != material.clearcoatRoughness) setClearcoatRoughness(material.clearcoatRoughness)

                        sheen_color = "#"+combindHex(material.sheenColor.getHex().toString(16))
                        if(sheen_roughness != material.sheenRoughness) setSheenRoughness(material.sheenRoughness)

                        if(transmission != material.transmission) setTransmission(material.transmission)
                    }
                }
            }
        }
    }

    const picRender = () => {
        if(!!buffer_material) scene.updatePic(scene.engine.screenRender.render(buffer_material))
    }

    return (
        <Flex
            display={ isSelect ? "flex" : "none" }
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
                        spacing="10px"
                    >
                        <Text
                            fontSize="16px"
                            fontWeight="600"
                        >Standard</Text>

                        <MaterialAndMap
                            text="Albedo"
                            hasColor={ true }
                            color_txt={ diffuse_color }
                        />

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Normal" />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Normal Scale:</Text>
                                <Spacer />
                                <HStack>
                                    <Text>x</Text>
                                    <Input
                                        w="50px"
                                        h="30px"
                                        px="2px"
                                        focusBorderColor="gray.400"
                                        textAlign="center"
                                        defaultValue={ (normal_map_scale_x).toFixed(2) }
                                        type="number"
                                        ref={ normal_map_scale_x_input }
                                        onBlur={ () => {
                                                setNormalMapScaleX(parseFloat(normal_map_scale_x_input.current.value))
                                                picRender()
                                            }
                                        }
                                        onKeyPress={ (e) => {
                                                if(e.key == "Enter") {
                                                    setNormalMapScaleX(parseFloat(normal_map_scale_x_input.current.value))
                                                    picRender()
                                                }
                                            }
                                        }
                                    />
                                </HStack>
                                <HStack>
                                    <Text>y</Text>
                                    <Input
                                        w="50px"
                                        h="30px"
                                        px="2px"
                                        focusBorderColor="gray.400"
                                        textAlign="center"
                                        defaultValue={ (normal_map_scale_y).toFixed(2) }
                                        type="number"
                                        ref={ normal_map_scale_y_input }
                                        onBlur={ () => {
                                                setNormalMapScaleY(parseFloat(normal_map_scale_y_input.current.value))
                                                picRender()
                                            }
                                        }
                                        onKeyPress={ (e) => {
                                                if(e.key == "Enter") {
                                                    setNormalMapScaleY(parseFloat(normal_map_scale_y_input.current.value))
                                                    picRender()
                                                }
                                            }
                                        }
                                    />
                                </HStack>
                            </HStack>
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Bump" />
                            <MaterialSlider
                                text="Bump Scale"
                                value={ bump_map_scale }
                                setBack={ setBumpMapScale }
                                material={ buffer_material }
                                type="bump_map_scale"
                                scene={ scene }
                            />
                        </VStack>

                        <MaterialAndMap text="Alpha" />

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Ambient Occusion" />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>aoMap Intensity</Text>
                                <Spacer />
                                <Input
                                    w="50px"
                                    h="30px"
                                    px="2px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    defaultValue={ (ao_intensity).toFixed(2) }
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Metalness" />
                            <MaterialSlider
                                text=""
                                value={ metalness }
                                setBack={ setMetalness }
                                material={ buffer_material }
                                type="metalness"
                                scene={ scene }
                            />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Roughness" />
                            <MaterialSlider
                                text=""
                                value={ roughness }
                                setBack={ setRoughness }
                                material={ buffer_material }
                                type="roughness"
                                scene={ scene }
                            />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap
                                text="Emissive"
                                hasColor={ true }
                                color_txt={ emissive_color }
                            />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Emissive Intensity</Text>
                                <Spacer />
                                <Input
                                    w="50px"
                                    h="30px"
                                    px="2px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    defaultValue={ (1).toFixed(2) }
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Displacement" />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Displacement Scale</Text>
                                <Spacer />
                                <Input
                                    w="50px"
                                    h="30px"
                                    px="2px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    defaultValue={ (1).toFixed(2) }
                                />
                            </HStack>
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Displacement Bias</Text>
                                <Spacer />
                                <Input
                                    w="50px"
                                    h="30px"
                                    px="2px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    defaultValue={ (0).toFixed(2) }
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Environment" />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Environment Intensity</Text>
                                <Spacer />
                                <Input
                                    w="50px"
                                    h="30px"
                                    px="2px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    defaultValue={ (1).toFixed(2) }
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Light" />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Light Intensity</Text>
                                <Spacer />
                                <Input
                                    w="50px"
                                    h="30px"
                                    px="2px"
                                    focusBorderColor="gray.400"
                                    textAlign="center"
                                    defaultValue={ (1).toFixed(2) }
                                />
                            </HStack>
                        </VStack>
                    </VStack>

                    <Box
                        w="90%"
                        h="2px"
                        bgColor="gray.700"
                    />

                    <VStack
                        w="full"
                        spacing="10px"
                    >
                        <Text
                            fontSize="16px"
                            fontWeight="600"
                        >Advance</Text>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Clearcoat" />
                            <MaterialSlider
                                text=""
                                value={ clearcoat }
                                setBack={ setClearcoat }
                                material={ buffer_material }
                                type="clearcoat"
                                scene={ scene }
                            />
                            <MaterialAndMap text="Clearcoat Normal" />
                            <HStack
                                w="full"
                                pl="67px"
                                pr="15px"
                            >
                                <Text>Normal Scale:</Text>
                                <Spacer />
                                <HStack>
                                    <Text>x</Text>
                                    <Input
                                        w="50px"
                                        h="30px"
                                        px="2px"
                                        focusBorderColor="gray.400"
                                        textAlign="center"
                                        defaultValue={ (1).toFixed(2) }
                                    />
                                </HStack>
                                <HStack>
                                    <Text>y</Text>
                                    <Input
                                        w="50px"
                                        h="30px"
                                        px="2px"
                                        focusBorderColor="gray.400"
                                        textAlign="center"
                                        defaultValue={ (1).toFixed(2) }
                                    />
                                </HStack>
                            </HStack>
                            <MaterialAndMap text="Clearcoat Roughness" />
                            <MaterialSlider
                                text=""
                                value={ clearcoat_roughness }
                                setBack={ setClearcoatRoughness }
                                material={ buffer_material }
                                type="clearcoat_roughness"
                                scene={ scene }
                            />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap
                                text="SheenColor"
                                hasColor={ true }
                                color_txt={ sheen_color }
                            />
                            <MaterialAndMap text="SheenRoughness" />
                            <MaterialSlider
                                text=""
                                value={ sheen_roughness }
                                setBack={ setSheenRoughness }
                                material={ buffer_material }
                                type="sheen_roughness"
                                scene={ scene }
                            />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Transmission" />
                            <MaterialSlider
                                text=""
                                value={ transmission }
                                setBack={ setTransmission }
                                material={ buffer_material }
                                type="transmission"
                                scene={ scene }
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Material