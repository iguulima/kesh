import { View, Text, FlatList, Button } from 'react-native';
import { getDividas, Divida } from '~/services/storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '~/components/Layout';

export default function Home() {
    type RootStackParamList = {
        Home: undefined;
        AddDivida: undefined;
    };
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [dividas, setDividas] = useState<Divida[]>([]);
    
    useEffect(() => {
        async function loadDividas() {
            const data = await getDividas();
            setDividas(data);
        }
        
        loadDividas();
    }, []);
    
    return (
        <Layout>
            <Text>Home</Text>
            <Button title="Adicionar Divida" onPress={() => navigation.navigate('AddDivida')} />
        </Layout>
    );
}
