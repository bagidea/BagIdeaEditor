import {
    Flex,
    HStack,
    Text
} from '@chakra-ui/react'

import TransformInput from './transform_input'

export interface TransformValues {
    x: number,
    y: number,
    z: number
}

const TransformObject: React.FC<{ text: string, values: TransformValues }> = ({ text, values }) => {
    return (
        <HStack
            w="full"
            h="40px"
        >
            <Flex
                w="80px"
                pr="5px"
                justifyContent="right"
            >
                <Text
                    fontSize="16px"
                    color="gray.200"
                >{ text }:</Text>
            </Flex>

            <HStack>
                <TransformInput text="x" value={ values.x } type_input={ text+"_x" } />
                <TransformInput text="y" value={ values.y } type_input={ text+"_y" } />
                <TransformInput text="z" value={ values.z } type_input={ text+"_z" } />
            </HStack>
        </HStack>
    )
}

export default TransformObject