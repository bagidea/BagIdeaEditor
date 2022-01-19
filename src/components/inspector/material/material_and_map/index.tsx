import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react'
import React from 'react'

import { BsDot } from 'react-icons/bs'
import { MdTexture } from 'react-icons/md'
import { CgColorBucket } from 'react-icons/cg'

const MaterialAndMap: React.FC<{ text: string, hasColor?: boolean }> = ({ text, hasColor }) => {
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
                    bgColor="gray.900"
                    border="1px solid"
                    borderColor="white"
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
                    bgColor="red"
                    border="1px solid"
                    borderColor="white"
                />
                <BsDot />
                <Text
                    fontSize="15px"
                    color="gray.200"
                >#ff0000</Text>
            </HStack>
        </HStack>
    )
}

export default MaterialAndMap