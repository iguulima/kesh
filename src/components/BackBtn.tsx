import { Text, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BackBtn() {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <View style={styles.row}>
                <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                <Text style={styles.text}>Voltar</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});