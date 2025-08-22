import { useState } from 'react';
import { Text, TextInput, View, Alert, StyleSheet, Pressable } from 'react-native';
import { saveDivida } from '~/services/storage';
import BackBtn from '~/components/BackBtn';
import { useNavigation } from '@react-navigation/native';
import Layout from '~/components/Layout';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddDivida() {
    const navigation = useNavigation();
    
    const [pessoa, setPessoa] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    
    async function handleAddDivida() {
        if (!pessoa.trim() || !descricao.trim() || !valor.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos corretamente.');
            return;
        }
        
        const novaDivida = {
            id: Date.now().toString(),
            pessoa,
            descricao,
            valor: parseFloat(valor),
        };
        
        try {
            await saveDivida(novaDivida);
            Alert.alert('Sucesso', 'Dívida salva!');
            setPessoa('');
            setDescricao('');
            setValor('');
            navigation.goBack();
        } catch {
            Alert.alert('Erro', 'Não foi possível salvar a dívida');
        }
    }
    
    return (
        <Layout>
        <BackBtn />
        
        <View style={styles.container}>
            <Text style={styles.label}>DETALHES</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Ionicons name="person-outline" size={24} color="#C5D0DE" />
                <Text style={{fontSize: 16, color: '#C5D0DE', fontWeight: '600'}}>Pessoa</Text>
            </View>
            <TextInput
                value={pessoa}
                onChangeText={setPessoa}
                placeholder="Pessoa"
                placeholderTextColor="#67788c"
                style={styles.input}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Ionicons name="document-text-outline" size={24} color="#C5D0DE" />
                <Text style={{fontSize: 16, color: '#C5D0DE', fontWeight: '600'}}>Descrição</Text>
            </View>
            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descrição"
                placeholderTextColor="#67788c"
                style={[styles.input, { height: 100 }]}
                multiline
                numberOfLines={4}
            />
        </View>
        
        <View style={styles.container}>
            <Text style={styles.label}>Qual o valor da sua dívida?</Text>
            <View>
                <Text style={{fontSize: 16, color: '#C5D0DE', fontWeight: '600'}}>$ Valor</Text>
                <TextInput
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
                placeholder="R$ 0,00"
                placeholderTextColor="#67788c"
                style={styles.input}
            />
            </View>
        </View>
        
        <Pressable style={styles.btn} onPress={handleAddDivida}>
            <Ionicons name="add-outline" size={24} color="#fff" />
            <Text style={styles.btnText}>Adicionar Dívida</Text>
        </Pressable>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#172131',
        borderRadius: 12,
        marginVertical: 8,
        padding: 20,
    },
    label: {
        color: '#C5D0DE',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 32,
    },
    input: {
        color: '#FFFFFF',
        backgroundColor: '#1C2735',
        borderColor: '#263141',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        marginBottom: 32,
        fontSize: 16,
    },
    btn:{
        backgroundColor: '#d6171d',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnText:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});
