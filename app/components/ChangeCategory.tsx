import { View, Text } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    withMenuContext
} from 'react-native-popup-menu';
import { useEffect, useRef } from 'react';



function ChangeCategoryComponent({ category, onClose, position, ctx }) {

    useEffect(() => {
        ctx.menuActions.openMenu(category.id)
    }, [ctx.menuActions, category])

return (
    <View>
        <Menu name={category.id}>
            <MenuTrigger />
            <MenuOptions optionsContainerStyle={{ top: position.y, left: position.x }}>
                <MenuOption onSelect={() => console.log('Edit button pressed!')} text='Edit' />
                <MenuOption onSelect={() => console.log('Edit button pressed!')} text='Delete' />
                <MenuOption onSelect={onClose} text='Cancel' />
            </MenuOptions>
        </Menu>
    </View>
    )
}

const ChangeCategory = withMenuContext(ChangeCategoryComponent)

export default ChangeCategory