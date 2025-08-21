import { FlatList, Text, StyleSheet, Pressable, View, Modal } from 'react-native';
import { getDividas, Divida, deleteDivida } from '~/services/storage';
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '~/components/Layout';
import ModalContent from '~/components/Modal'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {
    type RootStackParamList = {
        Home: undefined;
        AddDivida: undefined;
    };
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [dividas, setDividas] = useState<Divida[]>([]);
    const [dividaSelecionada, setDividaSelecionada] = useState<Divida | null>(null);

    
    useFocusEffect(
      useCallback(() => {
        async function loadDividas() {
          const data = await getDividas();
          setDividas(data);
        }
        loadDividas();
      }, [])
    );

    const handleDelete = async (id: string) => {
    await deleteDivida(id);
    const data = await getDividas();
    setDividas(data);
  };

    const [modalVisivel, setModalVisivel] = useState(true);

    const totalDividas = dividas.reduce((acc, item) => acc + Number(item.valor), 0);
    
return (
  <Layout>
    <LinearGradient 
      colors={['#fd1d1d', '#fe3e3e', '#ff6161']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.totalContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="card-outline" size={24} color="#fff" />
          <Text style={styles.totalTitle}>Dividas à pagar</Text>
        </View>
      <Text style={styles.totalValor}>R$ {totalDividas.toFixed(2)}</Text>
    </LinearGradient>
    <FlatList
    style={styles.listContainer}
      data={dividas}
      keyExtractor={(item: Divida) => item.id?.toString() ?? Math.random().toString()}
      renderItem={({ item }: { item: Divida }) => (
      <Pressable 
      onPress={() => {
          setModalVisivel(true);
          setDividaSelecionada(item);
      }}>
        <View style={[styles.itemContainer, {marginBottom: 12}]}>
            <View style={{display: 'flex', alignItems: 'center' }}>
                <Text style={styles.itemPessoa}>{item.pessoa}</Text>
                <Text style={styles.itemDescricao}>{item.descricao}</Text>
            </View>
            <View>
                <Text style={styles.itemValor}>
                    {typeof item.valor === 'number' ? `R$ ${item.valor.toFixed(2)}` : item.valor}
                </Text>
            </View>
        </View>
      </Pressable>
      )}
      ListEmptyComponent={
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 32 }}>
          Nenhuma dívida cadastrada.
        </Text>
      }
    />
    <Pressable style={styles.btn} onPress={() => navigation.navigate('AddDivida')}>
      <Text style={styles.btnText}>Adicionar Dívida</Text>
    </Pressable>
    <ModalContent 
      visible={modalVisivel}
      onClose={() => setModalVisivel (false)}
      divida={dividaSelecionada}
      onDelete={handleDelete}
    />
  </Layout>
);
}

const styles = StyleSheet.create({
  totalContainer:{
    height: 200,
    borderRadius: 20,
    padding: 20,
  },
  totalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalValor: {
  color: '#fff',
  fontSize: 48,
  fontWeight: 'bold',
  marginTop: 32,
},
  btn: {
    backgroundColor: '#1C2735',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor:'#101828',
    padding: 16,
    borderRadius: 8,
  },
  itemContainer: {
    backgroundColor: '#1E2939',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#273344',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  itemPessoa: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  itemValor: {
    color: '#FF6467',
    fontSize: 16,
    fontWeight: '600',
  },
    itemDescricao: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: '400',
    },
});