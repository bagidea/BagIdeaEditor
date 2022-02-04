import {
    HStack,
    Input,
    Text
} from '@chakra-ui/react'

import {
    BaseSyntheticEvent,
    MutableRefObject,
    useEffect,
    useRef,
    useState
} from 'react'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import { MathUtils } from 'three'
import { RootState } from '../../../../redux/reducers'
import { SelectTransform } from '../../../../redux/slices/context_3d'

const TransformInput: React.FC<{ text: string, type_input: string, value: number }> = ({ text, value, type_input }) => {
    const object: any = useSelector((state: RootState) => state.context3DSlice.selectObject)
    const obj: any = object?.object?.object?.object
    const dispatch = useDispatch()

    const [_value, setValue] = useState(value)
    const value_input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const sendToStore = (_obj: any) => {
        const transform: SelectTransform = {
            position: {
                x: _obj.position.x,
                y: _obj.position.y,
                z: _obj.position.z
            },
            rotation: {
                x: _obj.rotation.x,
                y: _obj.rotation.y,
                z: _obj.rotation.z
            },
            scale: {
                x: _obj.scale.x,
                y: _obj.scale.y,
                z: _obj.scale.z
            }
        }

        if(!!_obj) {
            dispatch({
                type: "context_3d@setSelectTransform",
                transform
            })
        }
    }

    const updateTransform = (e: BaseSyntheticEvent) => {
        //console.log(type_input)

        const _obj: any = !!obj ? obj : object.object
        const pos: number = e.target.value*1

        value_input.current.value = pos.toString()
        setValue(pos)

        switch(type_input) {
            case "position_x":
                _obj.position.x = pos
                break
            case "position_y":
                _obj.position.y = pos
                break
            case "position_z":
                _obj.position.z = pos
                break
            case "rotation_x":
                _obj.rotation.x = MathUtils.degToRad(pos)
                break
            case "rotation_y":
                _obj.rotation.y = MathUtils.degToRad(pos)
                break
            case "rotation_z":
                _obj.rotation.z = MathUtils.degToRad(pos)
                break
            case "scale_x":
                _obj.scale.x = pos
                break
            case "scale_y":
                _obj.scale.y = pos
                break
            case "scale_z":
                _obj.scale.z = pos
                break
        }

        sendToStore(_obj)
    }

    useEffect(() => {
        setValue(value)
    }, [value])

    return (
        <HStack
            alignItems="center"
            justifyContent="center"
        >
            <Text
                fontSize="16px"
                color="gray.200"
            >{ text }</Text>
            <Input
                id={ type_input }
                w="60px"
                h="30px"
                type="number"
                padding="5px"
                value={ _value /*value*/ }
                onChange={ updateTransform }
                ref={ value_input }
            />
        </HStack>
    )
}

export default TransformInput