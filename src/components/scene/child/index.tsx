import {
    Flex,
    HStack,
    Text
} from '@chakra-ui/react'

import {
    BsDot,
    //BsFillLightbulbFill
} from 'react-icons/bs'

import { SceneChild } from '../../../engine'

const Child: React.FC<{ child: SceneChild, onClick: (e, object: any) => void }> = ({ child, onClick }) => {
    return (
        <Flex
            w="full"
            h="40px"
            bgColor={ child.isSelect ? "green.700" : "gray.700" }
            _hover={ { bgColor: child.isSelect ? "green.600" : "gray.600" } }
            alignItems="center"
            padding="10px"
            borderLeft="4px"
            borderColor="gray.500"
            onClick={ (e) => onClick(e, child.object) }
            cursor="pointer"
        >
            <HStack>
                <BsDot />
                <Text
                    fontSize="16px"
                    color="gray.200"
                >{ child.object.name }</Text>
            </HStack>
        </Flex>
    )
}

export default Child