import mysql from 'mysql';

export const connectToDb = () => {
	const connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '',
		database: 'speed_shopperDB'
	});

	connection.connect(err => {
		if (err) throw err;
		console.log('connected as id ' + connection.threadId);
	});

	return { connection };
};
