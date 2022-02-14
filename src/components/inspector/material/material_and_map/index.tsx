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
    ColorPicker,
    useColor
} from 'react-color-palette'

import React, { Dispatch, SetStateAction } from 'react'
import { BsDot } from 'react-icons/bs'
import { MdTexture } from 'react-icons/md'
import { CgColorBucket } from 'react-icons/cg'

const MaterialAndMap: React.FC<{
        text: string,
        hasColor?: boolean,
        color_txt?: string
        setColor?: Dispatch<SetStateAction<string>>
    }> = ({ text, hasColor, color_txt, setColor }) =>
{
    const [color_palette, setColorPalette] = useColor("hex", "#ffffff")

    const onChangeColorComplete = () => {
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
                    >
                        <PopoverBody>
                            <ColorPicker
                                width={ 250 }
                                height={ 200 }
                                color={ color_palette }
                                onChange={ setColorPalette }
                                onChangeComplete={ () => onChangeColorComplete() }
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