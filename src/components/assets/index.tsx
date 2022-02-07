import { Flex } from '@chakra-ui/react'

import {
    useEffect,
    useState
} from 'react'

import { RiAddCircleLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { Asset } from '../../redux/slices/context_3d'
import AssetItem from './asset_item'

const Assets = () => {
    const assets: Asset[] = useSelector((state: RootState) => state.context3DSlice.assets)
    const [asset_objects, set_asset_objects] = useState([])

    useEffect(() => {
        //console.log(assets)

        const packs: Asset[] = []

        assets.forEach((v: any) => {
            const asset: Asset = v.asset
            //console.log(asset)
            packs.push(asset)
        })

        set_asset_objects(packs)
    }, [assets])

    return (
        <Flex
            w="100%"
            minH="250px"
            padding="10px"
            bgColor="gray.900"
        >
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

            {
                asset_objects.map((v: Asset, i: number) => (
                        <AssetItem
                            key={ i }
                            name={ v.name }
                            pic={ v.pic }
                        />
                    )
                )
            }
        </Flex>
    )
}

export default Assets