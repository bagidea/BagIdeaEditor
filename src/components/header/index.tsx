import { Flex, HStack, Text } from '@chakra-ui/react'
import { GiAbstract027 } from 'react-icons/gi'
import AddMenu from './add'
import EditMenu from './edit'
import FilesMenu from './files'

const Header = () => (
    <Flex
        w="100vw"
        h="60px"
        alignItems="center"
        padding="10px"
        bgColor="gray.900"
    >
        <HStack spacing="5px">
            <HStack
                mr="10px"
                spacing="5px"
            >
                <GiAbstract027
                    size="35px"
                    color="#bbbbff"
                />
                <Text
                    fontSize="2xl"
                    px="5px"
                    bgGradient="linear(to-l, #aaaaff, #aaaaaa)"
                    bgClip="text"
                >3D EDITOR</Text>
            </HStack>

            <FilesMenu />
            <EditMenu />
            <AddMenu />
        </HStack>
    </Flex>
)

export default Header