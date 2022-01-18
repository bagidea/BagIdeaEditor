import {
    Flex,
    HStack,
    Text,
    VStack
} from '@chakra-ui/react'

import {
    useEffect,
    useState
} from 'react'

import { ImEqualizer } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { SceneChild } from '../../engine'
import { RootState } from '../../redux/reducers'
import { SceneCanvas } from '../display/scene/canvas'
import NameInput from './name_input'
import Transform from './transform'

const Inspector = () => {
    const { sceneContext } = useSelector((state: RootState) => state.context3DSlice)
    const scene: SceneCanvas = sceneContext?.context
    const children: SceneChild[] = useSelector((state: RootState) => state.context3DSlice.sceneChildren)

    const [isSelect, setSelect] = useState(false)
    const [isName, setName] = useState("")

    useEffect(() => {
        let is_trans: boolean = false

        if(!!scene) is_trans = scene.lastSelected != -1 ? true : false
        else is_trans = false

        setSelect(is_trans)

        //if(!!scene && scene.lastSelected != -1) console.log(scene.sceneChildren[scene.lastSelected].object.name)
        //console.log(scene)
        setName(
            !!scene && scene.lastSelected != -1 ?
            !!scene.sceneChildren[scene.lastSelected] ?
            scene.sceneChildren[scene.lastSelected].object.name : "" : ""
        )
    }, [children])

    return (
        <Flex
            minW="350px"
            h="full"
            bgColor="gray.900"
        >
            <VStack
                w="full"
                spacing="3px"
            >
                <Flex
                    w="full"
                    h="50px"
                    bgColor="purple.800"
                    alignItems="center"
                    flexWrap="wrap"
                    pl="10px"
                >
                    <HStack>
                        <ImEqualizer size="20px" />

                        <Text
                            fontSize="20px"
                        >Inspector</Text>
                    </HStack>
                </Flex>

                <NameInput
                    isSelect={ isSelect }
                    text={ isName }
                />
                <Transform isSelect={ isSelect } />
            </VStack>
        </Flex>
    )
}

export default Inspector