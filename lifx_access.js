var lifx = require('ya-lifx')
var chalk = require('chalk')

module.exports = function(accessToken){
	lifx.init(accessToken)
	color_lights = []
	
	var listLightsPromise = lifx.listLights()
	
	listLightsPromise.then((resp)=>{
		resp.forEach((light)=>{
			if(light.product.capabilities.has_color) {
				color_lights.push(light)
			}
		})
		console.log('The following color lights were found:')
		color_lights.forEach((light)=>{
			console.log(light.label, " (id:",light.id,")")
		})
		console.log('Turning on color lights...')
		color_lights.forEach((light)=>{
			lifx.setState('id:'+light.id,{
				power:'on'
			})
		})
	})

	var setColorsFunction=(colors)=>{
		curridx = 0
		color_lights.forEach((light)=>{
			color = colors[curridx]
			console.log("Setting "+light.label+" to "+chalk.rgb(color.R,color.G,color.B)('\u25A3'))
			lifx.setState('id:'+light.id,{
				power:'on',
				color:'rgb:'+color.R+','+color.G+','+color.B,
				brightness:'1.0'
			})
			curridx = (curridx + 1) % colors.length
		})
	}

	return {
		setColor : (colors)=>{
			listLightsPromise.then((resp)=>{
				process.stdout.write("Using the following colors:")
				colors.forEach((color)=>{
					process.stdout.write(' '+chalk.rgb(color.R,color.G,color.B)('\u25A3')+' ')
				})
				process.stdout.write('\n')
				setColorsFunction(colors)
			})
		}
	}
}