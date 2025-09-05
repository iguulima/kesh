import { useState } from 'react';
import { Text, TextInput, View, Alert, StyleSheet, Pressable, Modal} from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
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

    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState<DateType>();
    
    const [showDatePicker, setShowDatePicker] = useState(false); // Novo estado

    async function handleAddDivida() {
        if (!pessoa.trim() || !descricao.trim() || !valor.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos corretamente.');
            return;
        }

        const descricaoSemQuebra = descricao.replace(/\n/g, ' ');
        
        const novaDivida = {
            id: Date.now().toString(),
            pessoa,
            descricao: descricaoSemQuebra,
            valor: parseFloat(valor),
            data: selected instanceof Date ? selected.toISOString() : null,
            dividaPaga: false,
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
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <Ionicons name="cash-outline" size={24} color="#C5D0DE" />
                        <Text style={{fontSize: 16, color: '#C5D0DE', fontWeight: '600'}}>Valor</Text>
                    </View>
                    <TextInput
                    value={valor}
                    onChangeText={setValor}
                    keyboardType="numeric"
                    placeholder="R$ 0,00"
                    placeholderTextColor="#67788c"
                    style={styles.input}
                />
            </View>
            <View style={{borderWidth: 1, borderColor: '#546782', marginHorizontal: 24, marginBottom: 32}}></View>
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
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8}}>
                    <Ionicons name="calendar-outline" size={24} color="#C5D0DE" />
                    <Text style={{ fontSize: 16, color: '#C5D0DE', fontWeight: '600' }}>Data</Text>
                </View>
                <View>
                    <Pressable style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} onPress={() => setShowDatePicker(true)}>
                        <Text style={{color:'white',fontSize: 16}}>{selected instanceof Date ? selected.toLocaleDateString() : 'Selecionar data'}</Text>
                        <Ionicons name="calendar-outline" size={24} color="#67788c" />
                    </Pressable>
                </View>

            </View>

            <Modal
                    visible={showDatePicker}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <DateTimePicker
                                mode="single"
                                date={selected}
                                onChange={({ date }) => {
                                    setSelected(date);
                                    setShowDatePicker(false);
                                }}
                                styles={{
                                    ...defaultStyles,
                                    today: { borderColor: 'blue', borderWidth: 1 },
                                    selected: { backgroundColor: 'blue' },
                                    selected_label: { color: 'white' },
                                }}
                                style={{ backgroundColor: 'white', borderRadius: 8 }}
                            />
                            <Pressable
                                style={styles.closeBtn}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text style={{ color: '#d6171d', fontWeight: 'bold' }}>Fechar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>


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
    },
    dateBtn: {
        backgroundColor: '#546782',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: 320,
        alignItems: 'center',
        elevation: 5,
    },
    closeBtn: {
        marginTop: 12,
        padding: 8,
    },
});
