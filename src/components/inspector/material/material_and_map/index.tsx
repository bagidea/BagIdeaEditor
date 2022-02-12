import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react'
import React from 'react'

import { BsDot } from 'react-icons/bs'
import { MdTexture } from 'react-icons/md'
import { CgColorBucket } from 'react-icons/cg'

const MaterialAndMap: React.FC<{
        text: string,
        hasColor?: boolean,
        color_txt?: string
    }> = ({ text, hasColor, color_txt }) =>
{
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
                <Box
                    boxSize="15px"
                    bgColor={ color_txt }
                    border="1px solid"
                    borderColor="white"
                    cursor="pointer"
                />
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