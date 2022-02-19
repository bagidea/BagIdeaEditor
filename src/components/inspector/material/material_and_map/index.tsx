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
        material: MeshPhysicalMaterial,
        type: string,
        scene: SceneCanvas
    }> = ({ text, hasColor, color_txt, setBack, material, type, scene }) =>
{
    const assets: Asset[] = useSelector((state: RootState) => state.context3DSlice.assets)
    const [color_palette, setColorPalette] = useColor("hex", !!color_txt ? color_txt : "#000000")

    const updateAll = (e) => {
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

    const picRender = () => {
        scene.updatePic(scene.engine.screenRender.render(material))
    }

    const onChangeColor = (e: Color) => {
        if(!!setBack) {
            updateAll(e.hex)
            picRender()
        }
    }

    const onDrop = () => {
        //console.log(scene.drag_asset)
        const asset: Asset = ((assets.find((v: any) => (v.asset as Asset).index == scene.drag_asset)) as any).asset as Asset
        //console.log(asset)
        if(!!asset) {
            if(asset.type == "texture") {
                material.map = scene.engine.textures.find((v: Texture) => v.id == asset.index)
                console.log(material.map)
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