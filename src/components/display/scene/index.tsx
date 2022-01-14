import {
    MutableRefObject,
    useEffect,
    useRef,
    useState
} from 'react'

import {
    Box,
    Flex,
    Tooltip,
    VStack
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import { SceneCanvas } from './canvas'
import { BsArrowsMove } from 'react-icons/bs'
import { BiWorld } from 'react-icons/bi'
import { MdCropRotate, MdPivotTableChart } from 'react-icons/md'
import { RiDragMoveFill } from 'react-icons/ri'
import { RootState } from '../../../redux/reducers'
import { SceneChild } from '../../../engine'

let scene: SceneCanvas

const Scene = () => {
    const windowContext: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
    const _scene: SceneCanvas = useSelector((state: RootState) => state.context3DSlice.sceneContext)
    const children: SceneChild[] = useSelector((state: RootState) => state.context3DSlice.sceneChildren)
    const dispatch = useDispatch()

    const [isMode, setMode] = useState("translate")
    const [isSpace, setSpace] = useState("world")

    const onSelectChild = (index: number, value: boolean) => {
        dispatch({
            type: "context_3d@setSceneSelectChild",
            values: {
                index: index,
                isSelect: value
            }
        })
    }

    const setSelect = (object: any) => {
        if(!!object) {
            if(scene.lastSelected != -1) {
                onSelectChild(scene.lastSelected, false)
                scene.lastSelected = -1
            }

            scene.lastSelected = scene.sceneChildren.findIndex((v: SceneChild) => v.object.object.id == object.id)
            onSelectChild(scene.lastSelected, true)
        } else {
            if(scene.lastSelected != -1) {
                onSelectChild(scene.lastSelected, false)
                scene.lastSelected = -1
            }
        }
    }

    const delObject = () => {
        if(scene.lastSelected != -1) {
            dispatch({
                type: "context_3d@removeSceneChild",
                index: scene.lastSelected
            })

            scene.engine.transformControl.detach()
            const index: number = scene.engine.objects.findIndex((v: any) =>
                    v.id == scene.sceneChildren[scene.lastSelected].object.object.id
                )
            scene.engine.scene.remove(scene.engine.objects[index])
            scene.engine.objects.splice(index, 1)

            scene.lastSelected = -1
        }
    }

    useEffect(() => {
        if(!!scene) scene.sceneChildren = children
        //console.log(children)
    }, [children])

    useEffect(() => {
        canvas.current.style.position = "absolute"
        scene = new SceneCanvas(
        //const scene: SceneCanvas = new SceneCanvas(
            windowContext,
            canvas,
            setMode,
            setSpace,
            setSelect,
            delObject
        )
        scene.init()
        scene.start()

        dispatch({
            type: "context_3d@setSceneContext",
            context: scene
        })
    }, [])

    return (
        <Flex
            w="100%"
            h="100%"
            padding="0px"
            ref={ windowContext }
        >
            <canvas ref={ canvas } />

            <Flex
                mt="10px"
                ml="10px"
                position="absolute"
            >
                <VStack>
                    <VStack spacing="3px">
                        <Tooltip hasArrow label="Translate [E]" placement="right">
                            <Flex
                                padding="5px"
                                bgColor={ (isMode == "translate") ? "gray.600" : "gray.700" }
                                rounded="10px"
                                _hover={ { bgColor: "gray.700" } }
                                border="2px"
                                borderColor={ (isMode == "translate") ? "white" : "gray.800" }
                                onClick={ () => { _scene.context.setTransformMode("translate") } }
                                cursor="pointer"
                            >
                                <BsArrowsMove size="25px" />
                            </Flex>
                        </Tooltip>

                        <Tooltip hasArrow label="Rotate [W]" placement="right">
                            <Flex
                                padding="5px"
                                bgColor={ (isMode == "rotate") ? "gray.600" : "gray.700" }
                                rounded="10px"
                                _hover={ { bgColor: "gray.700" } }
                                border="2px"
                                borderColor={ (isMode == "rotate") ? "white" : "gray.800" }
                                onClick={ () => { _scene.context.setTransformMode("rotate") } }
                                cursor="pointer"
                            >
                                <MdCropRotate size="25px" />
                            </Flex>
                        </Tooltip>

                        <Tooltip hasArrow label="Scale [E]" placement="right">
                            <Flex
                                padding="5px"
                                bgColor={ (isMode == "scale") ? "gray.600" : "gray.700" }
                                rounded="10px"
                                _hover={ { bgColor: "gray.700" } }
                                border="2px"
                                borderColor={ (isMode == "scale") ? "white" : "gray.800" }
                                onClick={ () => { _scene.context.setTransformMode("scale") } }
                                cursor="pointer"
                            >
                                <RiDragMoveFill size="25px" />
                            </Flex>
                        </Tooltip>
                    </VStack>

                    <Box
                        w="30px"
                        h="4px"
                        bgGradient="linear(to-l, gray.700, blue.700)"
                    />

                    <Tooltip hasArrow label="[Space]" placement="bottom">
                        <VStack spacing="3px">
                            <Tooltip hasArrow label="World" placement="right">
                                <Flex
                                    padding="5px"
                                    bgColor={ (isSpace == "world") ? "blue.600" : "blue.700" }
                                    rounded="10px"
                                    _hover={ { bgColor: "blue.700" } }
                                    border="2px"
                                    borderColor={ (isSpace == "world") ? "white" : "blue.800" }
                                    onClick={ () => { _scene.context.setTransformSpace("world") } }
                                    cursor="pointer"
                                >
                                    <BiWorld size="25px" />
                                </Flex>
                            </Tooltip>
        
                            <Tooltip hasArrow label="Local" placement="right">
                                <Flex
                                    padding="5px"
                                    bgColor={ (isSpace == "local") ? "blue.600" : "blue.700" }
                                    rounded="10px"
                                    _hover={ { bgColor: "blue.700" } }
                                    border="2px"
                                    borderColor={ (isSpace == "local") ? "white" : "blue.800" }
                                    onClick={ () => { _scene.context.setTransformSpace("local") } }
                                    cursor="pointer"
                                >
                                    <MdPivotTableChart size="25px" />
                                </Flex>
                            </Tooltip>
                        </VStack>
                    </Tooltip>
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Scene