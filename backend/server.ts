import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { TranslationRequest } from './types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req: TranslationRequest, res) => {
  const { messages, language } = req.body;

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: messages,
    });

    const translatedContent = JSON.parse(completion.content[0].text);
    res.json({ translations: translatedContent });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ message: 'Error processing translation' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});