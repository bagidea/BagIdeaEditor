import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { MutableRefObject, useEffect, useRef } from 'react'
import { GiCargoShip } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { SceneChild } from '../../engine'
import Child from './child'
import { SceneCanvas } from '../display/scene/canvas'

const Scene = () => {
    const scenePanelResize = () => scene_panel.current.style.height = (window.innerHeight-386)+"px"
    const scene_panel: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const children: SceneChild[] = useSelector((state: RootState) => state.context3DSlice.sceneChildren)

    const { sceneContext } = useSelector((state: RootState) => state.context3DSlice)
    const scene: SceneCanvas = sceneContext?.context
    const dispatch = useDispatch()

    useEffect(() => {
        scenePanelResize()
        window.addEventListener('resize', scenePanelResize)
    }, [])

    const checkSelect = () => {
        if(scene.lastSelected != -1) {
            scene.engine.transformControl.detach()
            dispatch({
                type: "context_3d@setSceneSelectChild",
                values: {
                    index: scene.lastSelected,
                    isSelect: false
                }
            })
            scene.lastSelected = -1
        }
    }

    const setSelect = (e: MouseEvent, object: any) => {
        e.stopPropagation()
        const obj = object
        scene.engine.transformControl.attach(obj.object)
        scene.setSelect(obj.object)
    }

    return (
        <Flex
            minW="260px"
            h="100%"
            bgColor="gray.900"
            padding="3px"
        >
            <Flex
                w="100%"
                h="50px"
                bgColor="purple.800"
                alignItems="center"
                flexWrap="wrap"
                pl="10px"
            >
                <HStack>
                    <GiCargoShip size="20px" />

                    <Text
                        fontSize="20px"
                    >Scene</Text>
                </HStack>
            </Flex>

            <Flex
                position="absolute"
                mt="53px"
                w="255px"
                minW="255px"
                h="0px"
                bgColor="gray.800"
                overflowY="scroll"
                css={
                    {
                        '&::-webkit-scrollbar': { background: "#1D4044", width: '10px' },
                        '&::-webkit-scrollbar-track': { width: '10px' },
                        '&::-webkit-scrollbar-thumb': { background: "#000000" }
                    }
                }
                ref={ scene_panel }
            >
                <VStack
                    w="full"
                    h="full"
                    spacing="3px"
                    padding="3px"
                    onClick={ () => checkSelect() }
                >
                    {
                        children.map((v: SceneChild, i: number) => (
                            <Child key={ i } child={ v } onClick={ setSelect } />
                        ))
                    }
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Scene