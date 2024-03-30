import { View, Text } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';



export default function ChangeCategory({ category }) {



return (
    <View>
        <Menu>
            <MenuTrigger>
                <Entypo name='dots-three-horizontal' size={20} color='#111111'></Entypo>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => console.log(`Edit button pressed for ${category.name}`)} text='Edit' />
                <MenuOption onSelect={() => console.log(`Delete button pressed for ${category.name}`)} text='Delete' />
            </MenuOptions>
        </Menu>
    </View>
    )
}
