import {
    Flex,
    HStack,
    Input,
    Text
} from '@chakra-ui/react'

import {
    MutableRefObject,
    useRef
} from 'react'

import { GiAbstract027 } from 'react-icons/gi'
import AddMenu from './add'
import EditMenu from './edit'
import EffectMenu from './effect'
import FilesMenu from './files'

const Header = () => {
    const file_image_loader: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const fileChange = () => {
        //console.log(file_loader.current.files[0])
        //console.log(file_loader.current.files[0].name)
        //console.log(file_loader.current.files[0].type)
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file_image_loader.current.files[0])

        reader.onloadend = () => {
            //console.log(reader.result)
        }
    }

    return (
        <Flex
            w="100vw"
            h="60px"
            alignItems="center"
            padding="10px"
            bgColor="gray.900"
        >
            <Input
                type="file"
                hidden={ true }
                accept="image/jpeg, image/png"
                onChange={ fileChange }
                ref={ file_image_loader }
            />
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

                <FilesMenu file_loader={ file_image_loader } />
                <EditMenu />
                <AddMenu />
                <EffectMenu />
            </HStack>
        </Flex>
    )
}

export default Header