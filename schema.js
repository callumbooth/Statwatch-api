import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import DB from './db';

const User = new GraphQLObjectType ({
	name: 'User',
	description: 'This is a user',
	fields: function() {
		return {
			id: {
				type: GraphQLInt,
				resolve(user) {
					return user.id;
				}
			},
			username: {
				type: GraphQLString,
				resolve(user) {
					return user.username;
				}
			},
			firstName: {
				type: GraphQLString,
				resolve(user) {
					return user.firstname;
				}
			},
			lastName: {
				type: GraphQLString,
				resolve(user) {
					return user.lastname;
				}
			},
			email: {
				type: GraphQLString,
				resolve(user) {
					return user.email;
				}
			},
			teams: {
				type: new GraphQLList(Team),
				resolve(user) {
					return user.getTeams();
				}
			}
		};
	}
});

const Team = new GraphQLObjectType ({
	name: 'Team',
	description: 'This is a team',
	fields: function() {
		return {
			id: {
				type: GraphQLInt,
				resolve(team) {
					return team.id;
				}
			},
			user: {
				type: User,
				resolve(team) {
					return team.getUser();
				}
			},
			name: {
				type: GraphQLString,
				resolve(team) {
					return team.name;
				}
			},
			gameId: {
				type: GraphQLInt,
				resolve(team) {
					return team.gameId;
				}
			},
			active: {
				type: GraphQLInt,
				resolve(team) {
					return team.active;
				}
			}
		};
	}
});

const TeamMember = new GraphQLObjectType ({
	name: 'TeamMember',
	description: 'A list of users of a team',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(teamMember) {
					return teamMember.id;
				}
			},
			team: {
				type: Team,
				resolve(teamMember) {
					return teamMember.getTeam();
				}
			},
			user: {
				type: User,
				resolve(teamMember) {
					return teamMember.getUser();
				}
			},
			role: {
				type: GraphQLString,
				resolve(teamMember) {
					return teamMember.role;
				}
			}
		};
	}
});

const Composition = new GraphQLObjectType({
	name: 'Composition',
	description: 'A list of compositions of a team',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(compositions) {
					return compositions.id;
				}
			},
			name: {
				type: GraphQLString,
				resolve(compositions) {
					return compositions.name;
				}
			},
			description: {
				type: GraphQLString,
				resolve(compositions) {
					return compositions.description;
				}
			},
			team: {
				type: Team,
				resolve(compositions) {
					return compositions.getTeam();
				}
			},
			user: {
				type: User,
				resolve(teamMember) {
					return teamMember.getUser();
				}
			},
			active: {
				type: GraphQLInt,
				resolve(compositions) {
					return compositions.active;
				}
			},
			heros: {
				type: GraphQLString,
				resolve(compositions) {
					return compositions.heros;
				}
			}
		};
	}
});


const Game = new GraphQLObjectType({
	name: 'Game',
	description: 'A list of games',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(games) {
					return games.id;
				}
			},
			name: {
				type: GraphQLString,
				resolve(game) {
					return game.name;
				}
			}
		};
	}
});


const Hero = new GraphQLObjectType({
	name: 'Hero',
	description: 'A list of heros from games',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(heros) {
					return heros.id;
				}
			},
			name: {
				type: GraphQLString,
				resolve(heros) {
					return heros.name;
				}
			},
			game: {
				type: Game,
				resolve(heros) {
					return heros.getGame();
				}
			}
		}
	}
});


const Map = new GraphQLObjectType({
	name: 'Map',
	description: 'A list of maps from games',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(maps) {
					return maps.id;
				}
			},
			name: {
				type: GraphQLString,
				resolve(maps) {
					return maps.name;
				}
			},
			type: {
				type: GraphQLString,
				resolve(maps) {
					return maps.type;
				}
			},
			game: {
				type: Game,
				resolve(maps) {
					return maps.getGame();
				}
			}
		}
	}
});


const Opponent = new GraphQLObjectType({
	name: 'Opponent',
	description: 'A list of Opponent for a team',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(opponents) {
					return opponents.id;
				}
			},
			name: {
				type: GraphQLString,
				resolve(opponents) {
					return opponents.name;
				}
			},
			team: {
				type: Team,
				resolve(opponents) {
					return opponents.getTeam();
				}
			},
			user: {
				type: User,
				resolve(opponents) {
					return opponents.getUser();
				}
			},
			active: {
				type: GraphQLInt,
				resolve(opponents) {
					return opponents.active;
				}
			}
		};
	}
});


const Result = new GraphQLObjectType({
	name: 'Result',
	description: 'A list of results for a team',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(results) {
					return results.id;
				}
			},
			team: {
				type: Team,
				resolve(results) {
					return results.getTeam();
				}
			},
			date: {
				type: GraphQLString,
				resolve(results) {
					return results.date;
				}
			},
			map: {
				type: Map,
				resolve(results) {
					return results.getMap();
				}
			},
			opponent: {
				type: Opponent,
				resolve(results) {
					return results.getOpponent();
				}
			},
			homeAtkComp: {
				type: GraphQLString,
				resolve(results) {
					return results.homeAtkComp;
				}
			},
			homeDefComp: {
				type: GraphQLString,
				resolve(results) {
					return results.homeDefComp;
				}
			},
			homeAtkTime: {
				type: GraphQLString,
				resolve(results) {
					return results.homeAtkTime;
				}
			},
			homeAtkPoints: {
				type: GraphQLInt,
				resolve(results) {
					return results.homeAtkPoints;
				}
			},
			awayAtkComp: {
				type: GraphQLString,
				resolve(results) {
					return results.awayAtkComp;
				}
			},
			awayDefComp: {
				type: GraphQLString,
				resolve(results) {
					return results.awayDefComp;
				}
			},
			awayAtkTime: {
				type: GraphQLString,
				resolve(results) {
					return results.awayAtkTime;
				}
			},
			awayAtkPoints: {
				type: GraphQLInt,
				resolve(results) {
					return results.awayAtkPoints;
				}
			},
			result: {
				type: GraphQLString,
				resolve(results) {
					return results.result;
				}
			}
		};
	}
});


const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is a root query',
	fields: function() {
		return {
			user: {
				type: new GraphQLList(User),
				args: {
					id: {
						type: GraphQLInt
					},
					email: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return DB.models.user.findAll({ where: args });
				}
			},
			team: {
				type: new GraphQLList(Team),
				resolve(root, args) {
					return DB.models.team.findAll({ where:args});
				}
			},
			teamMember: {
				type: new GraphQLList(TeamMember),
				resolve(root, args) {
					return DB.models.team_members.findAll({ where: args});
				}
			},
			composition: {
				type: new GraphQLList(Composition),
				resolve(root, args) {
					return DB.models.compositions.findAll({ where: args});
				}
			},
			game: {
				type: new GraphQLList(Game),
				resolve(root, args) {
					return DB.models.games.findAll({where:args});
				}
			},
			hero: {
				type: new GraphQLList(Hero),
				resolve(root, args) {
					return DB.models.heros.findAll({where:args});
				}
			},
			map: {
				type: new GraphQLList(Map),
				resolve(root, args) {
					return DB.models.maps.findAll({where:args});
				}
			},
			opponent: {
				type: new GraphQLList(Opponent),
				resolve(root,args) {
					return	DB.models.opponents.findAll({where:args});
				}
			},
			result: {
				type: new GraphQLList(Result),
				resolve(root, args) {
					return DB.models.results.findAll({where:args});
				}
			}
		};
	}
});

const Mutation =  new GraphQLObjectType({
	name: 'Mutation',
	description: 'Add a new user',
	fields: () => {
		return {
			addUser: {
				type: User,
				args: {
					username: {
						type: new GraphQLNonNull(GraphQLString)
					},
					email: {
						type: new GraphQLNonNull(GraphQLString)
					},
					firstName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					lastName: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve(_, args) {
					return DB.models.user.create({
						firstName: args.firstName,
						lastName: args.lastName,
						email: args.email.toLowerCase(),
						username: args.username
					});
				}
			},
			updateUser: {
				type: User,
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt)
					},
					email: {
						type: GraphQLString
					},
					firstName: {
						type: GraphQLString
					},
					lastName: {
						type: GraphQLString	
					}
				},
				resolve(_, args) {
					return DB.models.user.update({
						email: args.email.toLowerCase(),
						firstName: args.firstName,
						lastName: args.lastName
					}, {
						where: { id: args.id }
					});
				}
			}
		}
	}
})

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});


export default Schema;