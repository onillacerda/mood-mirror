require('dotenv').config();
const mongoose = require('mongoose');
const MoodRecord = require('./models/MoodRecord');

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado ✅');
    return inserirMoodsFake();
  })
  .catch(err => console.error('Erro na conexão MongoDB:', err));

async function inserirMoodsFake() {
  try {
    // Limpa todos os registros anteriores
    await MoodRecord.deleteMany({});
    
    const agora = new Date();

    // Cria registros de humor nos últimos 7 dias
    const moodsFake = [
      { mood: 'happy', date: new Date(agora.getTime() - 0 * 24 * 60 * 60 * 1000) },
      { mood: 'sad', date: new Date(agora.getTime() - 1 * 24 * 60 * 60 * 1000) },
      { mood: 'angry', date: new Date(agora.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { mood: 'surprised', date: new Date(agora.getTime() - 3 * 24 * 60 * 60 * 1000) },
      { mood: 'neutral', date: new Date(agora.getTime() - 4 * 24 * 60 * 60 * 1000) },
      { mood: 'happy', date: new Date(agora.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { mood: 'sad', date: new Date(agora.getTime() - 6 * 24 * 60 * 60 * 1000) }
    ];

    await MoodRecord.insertMany(moodsFake);

    console.log('✅ Dados de humor inseridos com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao inserir dados fake:', error);
    process.exit(1);
  }
}
