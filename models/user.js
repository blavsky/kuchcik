import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Taki e-mail już istnieje!'],
    required: [true, 'E-mail jest wymagany!'],
  },
  username: {
    type: String,
    required: [true, 'Nazwa użytkownika jest wymagana!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Nazwa użytkownika nieprawidłowa, powinna posiadać 8-20 alfanumerycznych znaków i być unikatowa!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;