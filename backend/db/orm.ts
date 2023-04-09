// Import MySQL connection.
import { connectToDb } from './connect';

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = (num: number) => {
	const arr = [];

	for (let i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob: any) => {
	const arr = [];

	// loop through the keys and push the key/value as a string int arr
	for (const key in ob) {
		let value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === 'string' && value.indexOf(' ') >= 0) {
				value = "'" + value + "'";
			}
			// e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
			// e.g. {sleepy: true} => ["sleepy=true"]
			arr.push(key + '=' + value);
		}
	}

	// translate array of strings to a single comma-separated string
	return arr.toString();
};

// Object for all our SQL statement functions.
export const useOrm = () => {
	const { connection } = connectToDb();

	const getAll = (tableInput: string, cb: Function) => {
		const queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	};
	const create = (table: string, cols: string[], vals: string[], cb: Function) => {
		let queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		console.log(queryString);

		connection.query(queryString, vals, function (err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	};
	// An example of objColVals would be {name: panther, sleepy: true}
	const update = (table: string, objColVals: any, condition: string, cb: Function) => {
		let queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	};

	return { getAll, create, update };
};

// Export the orm object for the model (cat.js).
