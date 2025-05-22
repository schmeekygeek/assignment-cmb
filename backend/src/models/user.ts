import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props: any) => `${props.value} is not a valid email address`
    },
  },
  password: { type: String, required: true },
}, { timestamps: true }
);

export const User = model('User', userSchema);
