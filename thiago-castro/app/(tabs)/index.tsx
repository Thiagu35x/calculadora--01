import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';

export default function App() {
  const [idade, setIdade] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anoNascimento, setAnoNascimento] = useState<number | null>(null);

  useEffect(() => {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();
    const i = parseInt(idade);
    const d = parseInt(dia);
    const m = parseInt(mes);

    if (!isNaN(i) && !isNaN(d) && !isNaN(m)) {
      let anoCalculado = anoAtual - i;
      if (m > mesAtual || (m === mesAtual && d > diaAtual)) {
        anoCalculado -= 1;
      }
      setAnoNascimento(anoCalculado);
    } else {
      setAnoNascimento(null);
    }
  }, [idade, dia, mes]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>Calculadora de Nascimento</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Idade:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={idade} onChangeText={setIdade} placeholder="Ex: 25" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dia de Nascimento:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={dia} onChangeText={setDia} placeholder="Ex: 15" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mês de Nascimento:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={mes} onChangeText={setMes} placeholder="Ex: 08" />
          </View>
          {anoNascimento && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Você nasceu em:</Text>
              <Text style={styles.resultValue}>{anoNascimento}</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  inner: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, color: '#666', marginBottom: 5 },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#fff' },
  resultBox: { marginTop: 20, alignItems: 'center', padding: 20, backgroundColor: '#e3f2fd', borderRadius: 12 },
  resultText: { fontSize: 18 },
  resultValue: { fontSize: 36, fontWeight: 'bold', color: '#1565c0' },
});
