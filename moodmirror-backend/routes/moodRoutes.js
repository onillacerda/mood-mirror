const express = require('express');
const router = express.Router();
const MoodRecord = require('../models/MoodRecord');

// Criar novo humor
router.post('/', async (req, res) => {
  try {
    const { mood } = req.body;
    const newRecord = new MoodRecord({ mood });
    await newRecord.save();

    // Deleta registros com mais de 7 dias
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await MoodRecord.deleteMany({ date: { $lt: sevenDaysAgo } });

    res.status(201).json({ message: 'Humor salvo', data: newRecord });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar humor', error: err });
  }
});

// Listar últimos 7 dias
router.get('/', async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const moods = await MoodRecord.find({ date: { $gte: sevenDaysAgo } }).sort({ date: -1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar registros', error: err });
  }
});

module.exports = router;
