import {Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function BackBtn() {
    const navigation = useNavigation();
    return (
        <Text onPress={() => navigation.goBack()} style={styles.backButton}>
            Voltar
        </Text>
    );
}

const styles = StyleSheet.create({
    backButton: {
        borderColor: 'red',
        borderWidth: 2,
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});