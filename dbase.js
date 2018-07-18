const pg = require('pg');
const db_conn = 'postgres://postgres:dazzle@127.0.0.1/dazzle';
​
const dbase = {
  users:{
    putInfo:(name,username,password,cb)=>{
      let q = `insert into users(name,username,password) values('${name}','${username}','${password}') returning id`;
      dbase.query(q,cb);
    }
  },
	query: (q, cb) => {
		var client = new pg.Client(db_conn);
		client.connect((err) => {
			if (err) {
				cb(err, 0);
			} else {
				client.query(q, (err, result) => {
					if (err) {
						console.log('ERROR: ' + err + ' For Query : ' + q);
					} else {
						cb(null, result.rows);
						var ret = q;
						if (q.length > 80) {
							ret = q.substr(0, 30 - 1) + '...';
							ret += q.substr(q.length - 30, q.length);
						}
					}
				});
			}
		});
​
		client.on('drain', client.end.bind(client));
	}
};
​
module.exports = dbase;
