import {
    Box,
    Flex,
    HStack,
    Input,
    Spacer,
    Text,
    VStack
} from '@chakra-ui/react'

import { BsDot } from 'react-icons/bs'
import { Asset } from '../../../redux/slices/context_3d'
import { MeshPhysicalMaterial } from 'three'
import { SceneCanvas } from '../../display/scene/canvas'
import MaterialAndMap from './material_and_map'
import MaterialSlider from './material_slider.tsx'

const combindHex = (str: string): string => {
    while(str.length < 6) str = "0"+str
    return str
}

const Material: React.FC<{
        isSelect: boolean,
        scene: SceneCanvas
    }> = ({ isSelect, scene }) =>
{
    let diffuse_color: string = ""

    if(!!scene) {
        if(scene.lastSelectedAsset != -1) {
            const asset: Asset = (scene.projectAssets[scene.lastSelectedAsset] as any).asset as Asset

            if(!!asset) {
                if(asset.isSelect && asset.type == "material") {
                    const material: MeshPhysicalMaterial = scene.engine.materials.find((v: MeshPhysicalMaterial) => v.id == asset.index)

                    if(!!material) {
                        diffuse_color = "#"+combindHex(material.color.getHex().toString(16))
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
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Bump" />
                            <MaterialSlider text="Bump Scale" value={ 50 } />
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
                                    defaultValue={ (1).toFixed(2) }
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Metalness" />
                            <MaterialSlider text="" value={ 50 } />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Roughness" />
                            <MaterialSlider text="" value={ 50 } />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Emissive" hasColor={ true } />
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
                            <MaterialSlider text="" value={ 50 } />
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
                            <MaterialSlider text="" value={ 50 } />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="SheenColor" hasColor={ true } />
                            <MaterialAndMap text="SheenRoughness" />
                            <MaterialSlider text="" value={ 50 } />
                        </VStack>

                        <VStack
                            w="full"
                            spacing="2px"
                        >
                            <MaterialAndMap text="Transmission" />
                            <MaterialSlider text="" value={ 50 } />
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Material