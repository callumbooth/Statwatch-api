import Sequelize from 'sequelize';
import mysql from 'mysql2';

const Conn = new Sequelize(
	'graphqldb',
	'desktop',
	'69avcNnm',
	{
		dialect: 'mysql',
		host: '192.168.1.75',
		define: {
			timestamps: false
		}
	}
);

Conn.authenticate()
.then(function () {
	console.log('Connected to DB');
})
.catch(function(err) {
	console.log('Failed to connect:', err);
});

//Users table
const User = Conn.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
});

//Teams table
const Team = Conn.define('team', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	gameId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});


//Team Members table
const TeamMembers = Conn.define('team_members', {
	role: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//Compositions table
const Compositions = Conn.define('compositions', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	heros: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//Games table
const Games = Conn.define('games', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});


//Heros table
const Heros = Conn.define('heros', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});


//Maps table
const Maps = Conn.define('maps', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//Opponents table
const Opponents = Conn.define('opponents', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});


//Results table
const Results = Conn.define('results', {
	date: {
		type: Sequelize.DATE,
		allowNull: false
	},
	homeAtkComp: {
		type: Sequelize.STRING,
		allowNull: false
	},
	homeDefComp: {
		type: Sequelize.STRING,
		allowNull: false
	},
	homeAtkTime: {
		type: Sequelize.STRING,
		allowNull: false
	},
	homeAtkPoints: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	awayAtkComp: {
		type: Sequelize.STRING,
		allowNull: false
	},
	awayDefComp: {
		type: Sequelize.STRING,
		allowNull: false
	},
	awayAtkTime: {
		type: Sequelize.STRING,
		allowNull: false
	},
	awayAtkPoints: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});


//Relationships

//Users table
User.hasMany(Team);
User.hasMany(TeamMembers);
User.hasMany(Compositions);
User.hasMany(Opponents);

//Teams table
Team.belongsTo(User);
Team.hasMany(TeamMembers);
Team.hasMany(Compositions);
Team.hasMany(Opponents);
Team.hasMany(Results);

//Team Members table
TeamMembers.belongsTo(User);
TeamMembers.belongsTo(Team);

//Compositions table
Compositions.belongsTo(User);
Compositions.belongsTo(Team);


//Games table
Games.hasMany(Team);
Games.hasMany(Team);
Games.hasMany(Heros);
Games.hasMany(Maps);

//Heros table
Heros.belongsTo(Games);

//Maps table
Maps.belongsTo(Games);

//Opponents table
Compositions.belongsTo(User);
Compositions.belongsTo(Team);

//Results table
Results.belongsTo(Team);
Results.belongsTo(Maps);
Results.belongsTo(Opponents);

export default Conn;