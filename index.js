var lifx_token = require('./config.json').accessToken
var lifx_accessor = require('./lifx_access')(lifx_token)
var ArgumentParser = require('argparse').ArgumentParser

var parser = new ArgumentParser({
	version: '1.0.0',
	addHelp:true,
	description: ''
})
parser.addArgument(
	['-l','--league'],
	{
		help:'Select the league to watch. Accepted leagues: nfl',
		required: true
	}
)
parser.addArgument(
	['-t','--team'],
	{
		help:'Select the team to watch. Team must be a member of the selected league',
		required: true
	}
)
var args = parser.parseArgs()
var colors = require('./colors/'+args.league+'/colors.json')
var teamcolors = colors[args.team]

console.log('Running...')
lifx_accessor.setColor(teamcolors)