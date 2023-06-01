import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  nazwa: {
    type: String,
    required: [true, 'Nazwa jest wymagana.'],
  },
  skladniki: {
    type: String,
    required: [true, 'Skladniki są wymagane.'],
  },
  instrukcje: {
    type: String,
    required: [true, 'Instrukcje są wymagane.'],
  },
  liczbaPorcji: {
    type: String,
    required: [true, 'Liczba porcji jest wymagana.'],
  },
  czasPrzygotowania: {
    type: String,
    required: [true, 'Czas przygotowania jest wymagany.'],
  },
  zdj: {
    type: String,
    required: [true, 'Zdjęcie jest wymagane.'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;