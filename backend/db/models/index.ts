import { Sequelize } from 'sequelize';

const connectionString = 'postgres://localhost/speedshopperbetadb';
// Option 1: Passing a connection URI
export const sequelize = new Sequelize(connectionString, { quoteIdentifiers: false }); // Example for postgres

const init = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

init();
