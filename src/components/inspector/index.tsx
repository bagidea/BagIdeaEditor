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
import { useDispatch, useSelector } from 'react-redux'
import { SceneChild } from '../../engine'
import { RootState } from '../../redux/reducers'
import { Asset } from '../../redux/slices/context_3d'
import { SceneCanvas } from '../display/scene/canvas'
import Material from './material'
import NameInput from './name_input'
import Transform from './transform'

const Inspector = () => {
    const { sceneContext } = useSelector((state: RootState) => state.context3DSlice)
    const scene: SceneCanvas = sceneContext?.context
    const children: SceneChild[] = useSelector((state: RootState) => state.context3DSlice.sceneChildren)
    const assets: Asset[] = useSelector((state: RootState) => state.context3DSlice.assets)
    const dispatch = useDispatch()

    const [isSelect, setSelect] = useState(false)
    const [isMaterial, setMaterial] = useState(false)
    const [isName, setName] = useState("")

    useEffect(() => {
        let is_trans: boolean = false

        if(!!scene) is_trans = scene.lastSelected != -1 ? true : false
        else is_trans = false

        setSelect(is_trans)

        let is_asset: boolean = false

        if(!!scene) is_asset = scene.lastSelectedAsset != -1 ? true : false
        else is_asset = false

        setMaterial(is_asset)

        //if(!!scene && scene.lastSelected != -1) console.log(scene.sceneChildren[scene.lastSelected].object.name)
        //console.log(scene)

        setName(
            !!scene && scene.lastSelected != -1 ?
            !!scene.sceneChildren[scene.lastSelected] ?
            scene.sceneChildren[scene.lastSelected].object.name : "" :
            !!scene && scene.lastSelectedAsset != -1 ?
            (scene.projectAssets[scene.lastSelectedAsset] as any).asset.name : ""
        )
    }, [children, assets])

    const updateName = (name: string) => {
        //console.log(name)

        const index: number =   scene.lastSelected != -1 ? scene.lastSelected :
                                scene.lastSelectedAsset != -1 ? scene.lastSelectedAsset : -1

        if(index != -1) {
            const type: string = scene.lastSelected != -1 ? "object" : "asset"

            dispatch({
                type: "context_3d@setName",
                values: {
                    index,
                    type,
                    name
                }
            })
        }
    }

    return (
        <Flex
            w="350px"
            minW="350px"
            h="full"
            bgColor="gray.900"
        >
            <VStack
                w="full"
                h="full"
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

                <Flex
                    w="full"
                    h="full"
                    overflowY="scroll"
                    css={
                        {
                            '&::-webkit-scrollbar': { background: "#1D4044", width: '10px' },
                            '&::-webkit-scrollbar-track': { width: '10px' },
                            '&::-webkit-scrollbar-thumb': { background: "#000000" }
                        }
                    }
                >
                    <VStack
                        w="full"
                        h="full"
                        spacing="3px"
                    >
                        <NameInput
                            isSelect={ isSelect || isMaterial }
                            text={ isName }
                            scene={ scene }
                            updateNameToStore={ updateName }
                        />
                        <Transform isSelect={ isSelect } />
                        <Material
                            isSelect={ isMaterial }
                            scene={ scene }
                        />
                    </VStack>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Inspector