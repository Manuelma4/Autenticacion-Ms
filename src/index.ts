import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/auth';

mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  });