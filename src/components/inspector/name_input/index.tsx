import {
    Flex,
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

import { BsDot } from 'react-icons/bs'
//import { SceneCanvas } from '../../display/scene/canvas'

const NameInput: React.FC<{
        isSelect: boolean,
        text: string,
        //scene: SceneCanvas,
        updateNameToStore: (string) => void
    }> = ({ isSelect, text, /*scene,*/ updateNameToStore }) =>
{
    const [_value, setValue] = useState(text)
    const value_input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const updateName = (e: BaseSyntheticEvent) => {
        const value: string = e.target.value
        setValue(value)
    }

    const _updateToStore = () => {
        //console.log("Name: "+value_input.current.value)
        //console.log(scene.lastSelected)
        //console.log(scene.lastSelectedAsset)
        updateNameToStore(value_input.current.value)
    }

    useEffect(() => {
        setValue(text)
    }, [text])

    return (
        <Flex
            display={ isSelect ? "flex" : "none" }
            w="full"
            padding="3px"
        >
            <Flex
                w="full"
                h="full"
                alignItems="center"
                padding="10px"
                bgColor="blue.700"
            >
                <HStack
                    w="full"
                >
                    <HStack>
                        <BsDot />

                        <Text
                            fontSize="16px"
                            color="gray.200"
                        >Name:</Text>
                    </HStack>

                    <Input
                        w="full"
                        h="30px"
                        padding="5px"
                        bgColor="gray.800"
                        focusBorderColor="gray.400"
                        value={ _value }
                        onChange={ updateName }
                        onBlur={ _updateToStore }
                        onKeyPress={ (e) => { if(e.key == "Enter") _updateToStore() } }
                        ref={ value_input }
                    />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default NameInput