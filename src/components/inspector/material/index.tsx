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
import { Asset } from '../../../redux/slices/context_3d'
import { SceneCanvas } from '../../display/scene/canvas'
import MaterialAndMap from './material_and_map'
import MaterialSlider from './material_slider.tsx'
import { useState } from 'react'

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

    let normal_map_scale: Vector2 = new Vector2();

    const [bump_map_scale, setBumpMapScale] = useState(0)

    let ao_intensity: number = 1

    const [metalness, setMetalness] = useState(0)

    let emissive_color: string = ""
    let sheen_color: string = ""

    if(!!scene) {
        if(scene.lastSelectedAsset != -1) {
            const asset: Asset = (scene.projectAssets[scene.lastSelectedAsset] as any).asset as Asset

            if(!!asset) {
                if(asset.isSelect && asset.type == "material") {
                    const material: MeshPhysicalMaterial = scene.engine.materials.find((v: MeshPhysicalMaterial) => v.id == asset.index)

                    if(!!material) {
                        buffer_material = material

                        diffuse_color = "#"+combindHex(material.color.getHex().toString(16))

                        normal_map_scale = new Vector2(material.normalScale.x, material.normalScale.y)

                        if(bump_map_scale != material.bumpScale) setBumpMapScale(material.bumpScale)

                        ao_intensity = material.aoMapIntensity

                        if(metalness != material.metalness) setMetalness(material.metalness)

                        emissive_color = "#"+combindHex(material.emissive.getHex().toString(16))
                        sheen_color = "#"+combindHex(material.sheenColor.getHex().toString(16))
                    }
                }
            }
        }
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
                                        defaultValue={ (normal_map_scale.x).toFixed(2) }
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
                                        defaultValue={ (normal_map_scale.y).toFixed(2) }
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
                            />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Roughness" />
                            <MaterialSlider
                                text=""
                                value={ 50 }
                                material={ buffer_material }
                                type="roughness"
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
                                value={ 50 }
                                material={ buffer_material }
                                type="clearcoat"
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
                                value={ 50 }
                                material={ buffer_material }
                                type="clearcoat_roughness"
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
                                value={ 50 }
                                material={ buffer_material }
                                type="sheen_roughness"
                            />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Transmission" />
                            <MaterialSlider
                                text=""
                                value={ 50 }
                                material={ buffer_material }
                                type="transmission"
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Material