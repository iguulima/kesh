import { FlatList, Text, StyleSheet, Pressable, View } from 'react-native';
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
    <FlatList
    style={styles.listContainer}
      data={dividas}
      keyExtractor={(item: Divida) => item.id?.toString() ?? Math.random().toString()}
      renderItem={({ item }: { item: Divida }) => (
        <View style={styles.itemContainer}>
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
  </Layout>
);
}

const styles = StyleSheet.create({
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
    borderColor: '#263141',

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