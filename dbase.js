const pg = require('pg');
const db_conn = 'postgres://vplspdclbaxiln:ebf62c833da579a5601e2486e978bb8f0b261aa4c270be199bccd1eea75d4b4f@ec2-54-83-59-239.compute-1.amazonaws.com:5432/d68371kb0meho';
const dbase = {
    users:{
        putInfo:(name,username,password,cb)=>{
            let q = `insert into users(name,username,password) values('${name}','${username}','${password}') returning id`;
            dbase.query(q,cb);
        },
        getInfo:(cb)=>{
            let q = `select * from users`;
            dbase.query(q,cb);
        }
    },
    query: function(q, cb) {
		var client = new pg.Client(db_conn);
		client.connect(function(err) {
			if (err) {
				cb(err, 0);
			} else {
				client.query(q, function(err, result) {
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

		client.on('drain', client.end.bind(client));
	}
};

module.exports = dbase;