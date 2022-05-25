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

import HomeGroupIcon from 'vue-material-design-icons/HomeGroup'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup'
import AccountGroupOutlineIcon from 'vue-material-design-icons/AccountGroupOutline'
import TextIcon from 'vue-material-design-icons/Text'
import PaletteIcon from 'vue-material-design-icons/Palette'
import PaletteSwatchIcon from 'vue-material-design-icons/PaletteSwatch'
import PaletteSwatchOutlineIcon from 'vue-material-design-icons/PaletteSwatchOutline'
import TextLongIcon from 'vue-material-design-icons/TextLong'
import FormatListBulletedTypeIcon from 'vue-material-design-icons/FormatListBulletedType'

export const fields = {
	name: {
		id: 'name',
		icon: TextIcon,
		label: t('integration_visavid', 'Room name'),
		type: 'text',
		placeholder: t('integration_visavid', 'Room name'),
	},
	comment: {
		id: 'comment',
		icon: TextLongIcon,
		label: t('integration_visavid', 'Comment'),
		type: 'textarea',
		placeholder: t('integration_visavid', 'What is this room about?'),
	},
	type: {
		id: 'type',
		icon: FormatListBulletedTypeIcon,
		label: t('integration_visavid', 'Type'),
		type: 'select',
		placeholder: t('integration_visavid', 'Select a room type'),
		options: {
			one: { id: 'one', label: 'Type one', icon: AccountGroupIcon },
			two: { id: 'two', label: 'Type two', icon: AccountGroupOutlineIcon },
			three: { id: 'three', label: 'Type three', icon: HomeGroupIcon },
		},
	},
	style: {
		id: 'style',
		icon: PaletteSwatchIcon,
		label: t('integration_visavid', 'Style'),
		type: 'radio',
		default: 'two',
		options: {
			one: { label: 'Style one', icon: PaletteSwatchIcon },
			two: { label: 'Style two', icon: PaletteSwatchOutlineIcon },
			three: { label: 'Style three', icon: PaletteIcon },
		},
	},
}

