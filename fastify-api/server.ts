import mongoose from 'mongoose';
const uri =
	'mongodb+srv://gvandam:UGqVSTbqPmeWGjxu@avans.gnbdu4p.mongodb.net/?retryWrites=true&w=majority&appName=Avans';
const clientOptions = {
	serverApi: { version: '1' as const, strict: true, deprecationErrors: true }
};
async function run() {
	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(uri, clientOptions);
		if (mongoose.connection.db) {
			await mongoose.connection.db.admin().command({ ping: 1 });
			console.log('Pinged your deployment. You successfully connected to MongoDB!');
		} else {
			throw new Error('Database connection is undefined.');
		}
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoose.disconnect();
	}
}
run().catch(console.dir);
