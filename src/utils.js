/* jshint esversion: 6 */

export function Timer(callback, mydelay) {
	let timerId
	let start
	let remaining = mydelay

	this.pause = function() {
		window.clearTimeout(timerId)
		remaining -= new Date() - start
	}

	this.resume = function() {
		start = new Date()
		window.clearTimeout(timerId)
		timerId = window.setTimeout(callback, remaining)
	}

	this.resume()
}

let mytimer = 0

export function delay(callback, ms) {
	return function() {
		const context = this
		const args = arguments
		clearTimeout(mytimer)
		mytimer = setTimeout(function() {
			callback.apply(context, args)
		}, ms || 0)
	}
}

export const fields = [
	{
		id: 'name',
		label: t('integration_visavid', 'Room name'),
		type: 'text',
		placeholder: t('integration_visavid', 'Room name'),
	},
	{
		id: 'comment',
		label: t('integration_visavid', 'Comment'),
		type: 'textarea',
		placeholder: t('integration_visavid', 'What is this room about?'),
	},
]

