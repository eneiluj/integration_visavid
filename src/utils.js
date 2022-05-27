import HomeGroupIcon from 'vue-material-design-icons/HomeGroup'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup'
import AccountGroupOutlineIcon from 'vue-material-design-icons/AccountGroupOutline'
import TextIcon from 'vue-material-design-icons/Text'
import PaletteIcon from 'vue-material-design-icons/Palette'
import PaletteSwatchIcon from 'vue-material-design-icons/PaletteSwatch'
import PaletteSwatchOutlineIcon from 'vue-material-design-icons/PaletteSwatchOutline'
import TextLongIcon from 'vue-material-design-icons/TextLong'
import FormatListBulletedTypeIcon from 'vue-material-design-icons/FormatListBulletedType'

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
		icon: TextIcon,
		label: t('integration_visavid', 'Simple text'),
		type: 'text',
		placeholder: t('integration_visavid', 'text placeholder'),
		default: 'optional default value',
	},
	comment: {
		icon: TextLongIcon,
		label: t('integration_visavid', 'Text area'),
		type: 'textarea',
		placeholder: t('integration_visavid', 'long text\nplaceholder\n...'),
		default: 'optional\ndefault\nvalue',
	},
	type: {
		icon: FormatListBulletedTypeIcon,
		label: t('integration_visavid', 'Multi select'),
		type: 'select',
		placeholder: t('integration_visavid', 'Select a value'),
		options: {
			one: { id: 'one', label: 'First multiselect value', icon: AccountGroupIcon },
			two: { id: 'two', label: 'Second multiselect value', icon: AccountGroupOutlineIcon },
			three: { id: 'three', label: 'Third multiselect long long long value', icon: HomeGroupIcon },
			four: { id: 'four', label: 'Fourth multiselect value without icon' },
		},
		default: { id: 'one', label: 'First multiselect value', icon: AccountGroupIcon },
	},
	style: {
		icon: PaletteSwatchIcon,
		label: t('integration_visavid', 'Custom radio selector'),
		type: 'radio',
		options: {
			one: { label: 'First radio value', icon: PaletteSwatchIcon },
			two: { label: 'Second radio value', icon: PaletteSwatchOutlineIcon },
			three: { label: 'Third radio value with long long long text', icon: PaletteIcon },
			four: { label: 'Fourth radio value without icon' },
		},
		default: 'two',
	},
	permissions: {
		icon: PaletteSwatchIcon,
		label: t('integration_visavid', 'Classic Radio selector'),
		type: 'ncradio',
		options: {
			one: { label: 'First radio value', icon: PaletteSwatchIcon },
			two: { label: 'Second radio value', icon: PaletteSwatchOutlineIcon },
			three: { label: 'Third radio value with long text', icon: PaletteIcon },
			four: { label: 'Fourth radio value without icon' },
		},
		default: 'three',
	},
	acls: {
		icon: PaletteSwatchIcon,
		label: t('integration_visavid', 'Classic multi checkbox selector'),
		type: 'nccheckbox',
		options: {
			one: { label: 'First radio value', icon: PaletteSwatchIcon },
			two: { label: 'Second radio value', icon: PaletteSwatchOutlineIcon },
			three: { label: 'Third radio value with long text', icon: PaletteIcon },
			four: { label: 'Fourth radio value without icon' },
		},
		default: ['one', 'three'],
	},
}
