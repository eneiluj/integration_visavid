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

export const fields = {
	name: {
		id: 'name',
		label: t('integration_visavid', 'Room name'),
		type: 'text',
		placeholder: t('integration_visavid', 'Room name'),
	},
	comment: {
		id: 'comment',
		label: t('integration_visavid', 'Comment'),
		type: 'textarea',
		placeholder: t('integration_visavid', 'What is this room about?'),
	},
	type: {
		id: 'type',
		label: t('integration_visavid', 'Type'),
		type: 'select',
		placeholder: t('integration_visavid', 'Select a room type'),
		options: {
			one: { id: 'one', label: 'Type one' },
			two: { id: 'two', label: 'Type two' },
			three: { id: 'three', label: 'Type three' },
		},
	},
	style: {
		id: 'style',
		label: t('integration_visavid', 'Style'),
		type: 'radio',
		default: 'two',
		options: {
			one: { label: 'Style one' },
			two: { label: 'Style two' },
			three: { label: 'Style three' },
		},
	},
}

