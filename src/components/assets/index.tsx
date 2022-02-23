import {
    Button,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    VStack
} from '@chakra-ui/react'

import {
    useEffect,
    useState
} from 'react'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import { Flex } from '@chakra-ui/react'
import { RiAddCircleLine } from 'react-icons/ri'
import { RootState } from '../../redux/reducers'
import { Asset } from '../../redux/slices/context_3d'
import { SceneCanvas } from '../display/scene/canvas'
import AssetItem from './asset_item'

const Assets = () => {
    const load_scene: any = (useSelector((state: RootState) => state.context3DSlice.sceneContext) as any)
    const scene: SceneCanvas = (!!load_scene) ? (load_scene as any).context as SceneCanvas : null
    const assets: Asset[] = useSelector((state: RootState) => state.context3DSlice.assets)
    const [asset_objects, set_asset_objects] = useState([])
    const dispatch = useDispatch()

    const checkSelect = () => {
        if(scene.lastSelectedAsset != -1) {
            dispatch({
                type: "context_3d@setSelectAsset",
                values: {
                    index: scene.lastSelectedAsset,
                    isSelect: false
                }
            })
            scene.lastSelectedAsset = -1
        }

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

    useEffect(() => {
        const packs: Asset[] = []

        assets.forEach((v: any) => {
            const asset: Asset = v.asset
            packs.push(asset)
        })

        packs.sort((a: Asset, b: Asset) => a.name > b.name ? 1 : -1)
        set_asset_objects(packs)
    }, [assets])

    return (
        <Flex
            w="100%"
            minH="250px"
            padding="10px"
            bgColor="gray.900"
            onClick={ checkSelect }
            onMouseDown={ () => { scene.drag_asset = -1 } }
        >
            <Popover
                placement="top-start"
            >
                <PopoverTrigger>
                    <Flex
                        margin="5px"
                        w="100px"
                        h="100px"
                        border="5px dashed"
                        borderColor="blue.900"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        color="#2c5282"
                        _hover={
                            {
                                color: "#5f85b5",
                                borderColor: "blue.700"
                            }
                        }
                    >
                        <RiAddCircleLine
                            size="50px"
                        />
                    </Flex>
                </PopoverTrigger>

                <PopoverContent
                    w="200px"
                    bgColor="gray.900"
                    border="4px solid"
                    borderColor="gray.700"
                    rounded="10px"
                    _focus={ { outline: "0px" } }
                >
                    <PopoverBody>
                        <VStack
                            w="full"
                        >
                            <Button
                                w="full"
                                _focus={ { outline: "0px" } }
                            >New Material</Button>

                            <Button
                                w="full"
                                _focus={ { outline: "0px" } }
                            >Import Image</Button>

                            <Button
                                w="full"
                                _focus={ { outline: "0px" } }
                            >Import Model</Button>

                            <Button
                                w="full"
                                _focus={ { outline: "0px" } }
                            >Import Environment</Button>
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            {
                asset_objects.map((v: Asset, i: number) => (
                        <AssetItem
                            key={ i }
                            asset={ v }
                            scene={ scene }
                            checkSelect={ checkSelect }
                        />
                    )
                )
            }
        </Flex>
    )
}

export default Assets