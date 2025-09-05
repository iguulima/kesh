import { useState } from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import {Divida} from '~/services/storage';
import { Ionicons } from '@expo/vector-icons';
import { updateDividas } from '~/services/storage';

type Props = {
    visible: boolean;
    onClose: () => void;
    divida: Divida | null;
    onDelete: (id: string) => void;
}

export default function ModalContent({ visible, onClose, divida, onDelete }: Props) {
    if (!divida) return null;

        async function handlePagarDivida() {
        if (!divida) return;
        const dividaAtualizada = { ...divida, dividaPaga: true };
        await updateDividas(dividaAtualizada);
        onClose();
    }

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row',alignItems:'center', marginHorizontal:12}}>
                        <Text style={styles.contentTitle}>Detalhes da Divida</Text>
                        <Pressable onPress={onClose}> 
                            <Ionicons name="close-outline" size={28} color="#8097bf" />
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginVertical: 32}}>
                        <Text style={[styles.contentSubtitle, {fontSize: 20, marginBottom: 4}]}>$ VALOR:</Text>
                        <Text style={{fontSize: 32, color:'#FF6467', fontWeight: 'bold'}}>
                            {typeof divida.valor === 'number' ? `R$ ${divida.valor.toFixed(2)}` : divida.valor}
                        </Text>
                    </View>
                    <View style={styles.contentCard}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                            <Ionicons name="person-sharp" size={16} color="#8097bf" />
                            <Text style={[styles.contentSubtitle, {marginLeft: 4}]}>
                                DEVEDOR:
                            </Text>
                        </View>
                        <Text style={styles.contentCardText}>{divida.pessoa}</Text>
                    </View>
                    <View style={styles.contentCard}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                            <Ionicons name="document-text-outline" size={16} color="#8097bf" />
                            <Text style={[styles.contentSubtitle, {marginLeft: 4}]}>
                                DESCRIÇÃO:
                            </Text>
                        </View>
                        <Text style={styles.contentCardText}>{divida.descricao}</Text>
                    </View>
                    <View style={styles.contentCard}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                            <Ionicons name="calendar-outline" size={16} color="#8097bf" />
                            <Text style={[styles.contentSubtitle, {marginLeft: 4}]}>
                                DATA:
                            </Text>
                        </View>
                        <Text style={styles.contentCardText}>
                            {divida.data ? new Date(divida.data).toLocaleDateString('pt-BR') : 'Sem data'}
                        </Text>
                    </View>
                    <Pressable style={styles.pagarBtn} onPress={handlePagarDivida}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Pagar Dívida</Text>
                    </Pressable>
                    <Pressable onPress={() => { divida && onDelete(divida.id); onClose(); }} style={styles.deleteBtn}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Excluir Dívida</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalContainer: {
        backgroundColor: '#131a28',
        width: '90%',
        height: '75%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#273344',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    contentTitle:{
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentSubtitle: {
        color: '#8097bf',
        fontSize: 14,
        fontWeight: '500',
    },
    contentCard: {
        backgroundColor: '#1E2939',
        borderRadius: 12,
        padding: 16,
        paddingHorizontal: 12,
        marginVertical: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: '#273344',
    },
    contentCardText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
    },
    pagarBtn: {
        backgroundColor: '#00A63E',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    deleteBtn: {
        backgroundColor: '#FF6467',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
    }
});