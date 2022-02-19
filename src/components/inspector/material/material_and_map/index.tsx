import {
    Box,
    HStack,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text
} from '@chakra-ui/react'

import {
    Color,
    ColorPicker,
    useColor
} from 'react-color-palette'

import {
    Dispatch,
    SetStateAction
} from 'react'

import {
    Color as ColorT,
    Texture,
    MeshPhysicalMaterial
} from 'three'

import React from 'react'
import { BsDot } from 'react-icons/bs'
import { MdTexture } from 'react-icons/md'
import { CgColorBucket } from 'react-icons/cg'
import { SceneCanvas } from '../../../display/scene/canvas'
import { Asset } from '../../../../redux/slices/context_3d'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'

const MaterialAndMap: React.FC<{
        text: string,
        hasColor?: boolean,
        color_txt?: string
        setBack?: Dispatch<SetStateAction<string>>
        setBackTexture?: Dispatch<SetStateAction<any>>
        material: MeshPhysicalMaterial,
        type: string,
        scene: SceneCanvas
    }> = ({ text, hasColor, color_txt, setBack, setBackTexture, material, type, scene }) =>
{
    const assets: Asset[] = useSelector((state: RootState) => state.context3DSlice.assets)
    const [color_palette, setColorPalette] = useColor("hex", !!color_txt ? color_txt : "#000000")

    const updateAllColor = (e) => {
        if(!!material) {
            switch(type)
            {
                case "diffuse_color":
                    material.color = new ColorT(e)
                    break
                case "emissive_color":
                    material.emissive = new ColorT(e)
                    break
                case "sheen_color":
                    material.sheenColor = new ColorT(e)
                    break
                default:
                    console.log("invalid material type")
                    return
            }

            setBack(e)
        }
    }

    const updateAllTexture = (e) => {
        if(!!material) {
            switch(type)
            {
                case "diffuse_color":
                    material.map = e
                    setBackTexture(material.map)
                    break
                case "normal_map":
                    material.normalMap = e
                    setBackTexture(material.normalMap)
                    break
                case "bump_map":
                    material.bumpMap = e
                    setBackTexture(material.bumpMap)
                    break
                case "alpha_map":
                    material.alphaMap = e
                    setBackTexture(material.alphaMap)
                    break
                case "ao_map":
                    material.aoMap = e
                    setBackTexture(material.aoMap)
                    break
                case "metalness_map":
                    material.metalnessMap = e
                    setBackTexture(material.metalnessMap)
                    break
                case "roughness_map":
                    material.roughnessMap = e
                    setBackTexture(material.roughnessMap)
                    break
                case "emissive_color":
                    material.emissiveMap = e
                    setBackTexture(material.emissiveMap)
                    break
                case "displacement_map":
                    material.displacementMap = e
                    setBackTexture(material.displacementMap)
                    break
                case "environment_map":
                    material.envMap = e
                    setBackTexture(material.envMap)
                    break
                case "light_map":
                    material.lightMap = e
                    setBackTexture(material.lightMap)
                    break
                case "clearcoat_map":
                    material.clearcoatMap = e
                    setBackTexture(material.clearcoatMap)
                    break
                case "clearcoat_normal_map":
                    material.clearcoatNormalMap = e
                    setBackTexture(material.clearcoatNormalMap)
                    break
                case "clearcoat_roughness_map":
                    material.clearcoatRoughness = e
                    setBackTexture(material.clearcoatRoughnessMap)
                    break
                case "sheen_color":
                    material.sheenColorMap = e
                    setBackTexture(material.sheenColorMap)
                    break
                case "sheen_roughness_map":
                    material.sheenRoughnessMap = e
                    setBackTexture(material.sheenRoughnessMap)
                    break
                case "transmission_map":
                    material.transmissionMap = e
                    setBackTexture(material.transmissionMap)
                    break
                default:
                    console.log("invalid material type")
                    return
            }

            material.needsUpdate = true
            //material.map.needsUpdate = true
        }
    }

    const picRender = () => {
        scene.updatePic(scene.engine.screenRender.render(material))
    }

    const onChangeColor = (e: Color) => {
        if(!!setBack) {
            updateAllColor(e.hex)
            picRender()
        }
    }

    const onDrop = () => {
        //console.log(scene.drag_asset)
        const item_drop: any = (assets.find((v: any) => (v.asset as Asset).index == scene.drag_asset)) as any

        if(!!item_drop) {
            const asset: Asset = item_drop.asset as Asset
            //console.log(asset)
            if(!!asset) {
                if(asset.type == "texture") {
                    if(!!setBackTexture) {
                        updateAllTexture(scene.engine.textures.find((v: Texture) => v.id == asset.index))
                        picRender()
                    }
                }
            }
        }

        scene.drag_asset = -1
    }

    return (
        <HStack
            w="full"
            px="15px"
        >
            <HStack
                w="65%"
                spacing="2px"
            >
                <MdTexture />
                <Box
                    boxSize="15px"
                    border="1px solid"
                    borderColor="gray.700"
                    cursor="pointer"
                    onMouseUp={ onDrop }
                />
                <BsDot />
                <Text
                    fontSize="15px"
                    color="gray.200"
                    whiteSpace="nowrap"
                >{ text }</Text>
            </HStack>

            <HStack
                display={ hasColor ? "flex" : "none" }
                w="35%"
                spacing="2px"
            >
                <CgColorBucket />

                <Popover
                    placement="left"
                >
                    <PopoverTrigger>
                        <Box
                            boxSize="15px"
                            bgColor={ color_txt }
                            border="1px solid"
                            borderColor="white"
                            cursor="pointer"
                        />
                    </PopoverTrigger>
                
                    <PopoverContent
                        w="285px"
                        pt="10px"
                        bgColor="gray.900"
                        border="5px solid"
                        borderColor="gray.700"
                        rounded="20px"
                        _focus={ { outline: "0px" } }
                        onBlur={ () => onChangeColor(color_palette) }
                        onKeyPress={ (e) => { if(e.key == "Enter") onChangeColor(color_palette) } }
                    >
                        <PopoverBody>
                            <ColorPicker
                                width={ 250 }
                                height={ 200 }
                                color={ color_palette }
                                onChange={ setColorPalette }
                                onChangeComplete={ (e: Color) => onChangeColor(e) }
                                hideHSV
                                hideRGB
                                dark
                            />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>

                <BsDot />
                <Text
                    fontSize="15px"
                    color="gray.200"
                >{ color_txt }</Text>
            </HStack>
        </HStack>
    )
}

export default MaterialAndMap