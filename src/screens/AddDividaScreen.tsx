import { useState } from 'react';
import { Text, TextInput, View, Alert, StyleSheet, Pressable } from 'react-native';
import { saveDivida } from '~/services/storage';
import BackBtn from '~/components/BackBtn';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '~/components/Layout';

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
            <Text style={styles.label}>Detalhes</Text>
            <TextInput
                value={pessoa}
                onChangeText={setPessoa}
                placeholder="Pessoa"
                placeholderTextColor="gray"
                style={styles.input}
            />
            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descrição"
                placeholderTextColor="gray"
                style={[styles.input, { height: 100 }]}
                multiline
                numberOfLines={4}
            />
        </View>
        
        <View style={styles.container}>
            <Text style={styles.label}>Qual o valor da sua dívida?</Text>
            <TextInput
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
                placeholder="R$ 0,00"
                placeholderTextColor="gray"
                style={styles.input}
            />
        </View>
        
        <Pressable style={styles.btn} onPress={handleAddDivida}>
            <Text style={styles.btnText} >Adicionar</Text>
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
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 12,
    },
    input: {
        color: '#FFFFFF',
        backgroundColor: '#1C2735',
        borderColor: '#263141',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        fontSize: 16,
    },
    btn:{
        backgroundColor: '#1C2735',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    btnText:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});
