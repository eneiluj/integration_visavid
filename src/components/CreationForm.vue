<template>
	<div class="creationForm">
		<h2>
			{{ t('integration_visavid', 'Create a room') }}
		</h2>
		<div class="fields">
			<div v-for="(field, fieldId) in fields"
				:key="fieldId"
				class="field">
				<div v-if="field.type === 'text'">
					<TextIcon :size="20" />
					<label :for="'room-' + fieldId">
						{{ field.label }}
					</label>
					<input :id="'room-' + fieldId"
						v-model="newRoom[fieldId]"
						type="text"
						:placeholder="field.placeholder" />
				</div>
				<div v-else-if="field.type === 'textarea'">
					<TextLongIcon :size="20" />
					<label :for="'room-' + fieldId">
						{{ field.label }}
					</label>
					<textarea :id="'room-' + fieldId"
						v-model="newRoom[fieldId]"
						:placeholder="field.placeholder" />
				</div>
				<div v-else-if="field.type === 'select'">
					<FormatListBulletedTypeIcon :size="20" />
					<label :for="'room-' + fieldId">
						{{ field.label }}
					</label>
					<Multiselect v-model="newRoom[fieldId]"
						:options="Object.values(field.options)"
						:placeholder="field.placeholder"
						label="label" />
				</div>
				<div v-else-if="field.type === 'radio'">
					<FormatListBulletedTypeIcon :size="20" />
					<label :for="'room-' + fieldId">
						{{ field.label }}
					</label>
					<RadioElement
						:field-id="fieldId"
						:options="field.options"
						:value="newRoom[fieldId]"
						@update:value="newRoom[fieldId] = $event"/>
				</div>
			</div>
		</div>
		<div class="footer">
			<Button @click="$emit('cancel-clicked')">
				<template #icon>
					<UndoIcon />
				</template>
				{{ t('integration_visavid', 'Cancel') }}
			</Button>
			<Button type="primary" @click="onOkClick">
				<template #icon>
					<CheckIcon />
				</template>
				{{ t('integration_visavid', 'Create') }}
			</Button>
		</div>
	</div>
</template>

<script>
import FormatListBulletedTypeIcon from 'vue-material-design-icons/FormatListBulletedType'
import CheckIcon from 'vue-material-design-icons/Check'
import UndoIcon from 'vue-material-design-icons/Undo'
import TextIcon from 'vue-material-design-icons/Text'
import TextLongIcon from 'vue-material-design-icons/TextLong'
import Button from '@nextcloud/vue/dist/Components/Button'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import { showError } from '@nextcloud/dialogs'

import { fields } from '../utils'
import RadioElement from './RadioElement'

export default {
	name: 'CreationForm',

	components: {
		RadioElement,
		CheckIcon,
		UndoIcon,
		TextIcon,
		TextLongIcon,
		FormatListBulletedTypeIcon,
		Button,
		Multiselect,
	},

	props: {
	},

	data() {
		return {
			newRoom: { style: fields.style.default },
			fields,
		}
	},

	watch: {
	},

	mounted() {
	},

	computed: {
	},

	methods: {
		onOkClick() {
			let isFormValid = true
			Object.keys(this.fields).forEach((fieldId) => {
				const field = this.fields[fieldId]
				if (!this.newRoom[fieldId]) {
					showError(t('integration_visavid', 'Field "{name}" is missing', { name: field.label }))
					isFormValid = false
				}
			})
			if (isFormValid) {
				this.$emit('ok-clicked', this.newRoom)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.creationForm {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 12px;

	.fields {
		display: flex;
		flex-direction: column;
		.field > * {
			display: flex;
			align-items: center;
			margin: 5px 0 5px 0;
			> * {
				margin: 0 8px 0 8px;
			}
			label {
				width: 150px;
			}
			*:last-child {
				width: 250px;
			}
		}
	}

	.footer {
		display: flex;
		align-items: center;
		margin-top: 12px;
		> * {
			margin: 0 10px 0 10px;
		}
	}
}
</style>
