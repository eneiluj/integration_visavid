<template>
	<div class="creationForm">
		<h2>
			{{ t('integration_visavid', 'Create a room') }}
		</h2>
		<div class="fields">
			<div v-for="field in fields"
				:key="field.id"
				class="field">
				<div v-if="field.type === 'text'">
					<TextIcon :size="20" />
					<label :for="'room-' + field.id">
						{{ field.label }}
					</label>
					<input :id="'room-' + field.id"
						   v-model="newRoom[field.id]"
						   type="text"
						   :placeholder="field.placeholder" />
				</div>
				<div v-else-if="field.type === 'textarea'">
					<TextLongIcon :size="20" />
					<label :for="'room-' + field.id">
						{{ field.label }}
					</label>
					<textarea :id="'room-' + field.id"
						v-model="newRoom[field.id]"
						:placeholder="field.placeholder" />
				</div>
			</div>
		</div>
		<div class="footer">
			<Button @click="$emit('cancel-clicked')">
				<template #icon>
					<UndoIcon :size="20" />
				</template>
				{{ t('integration_visavid', 'Cancel') }}
			</Button>
			<Button type="primary" @click="onOkClick">
				<template #icon>
					<CheckIcon :size="20" />
				</template>
				{{ t('integration_visavid', 'Create') }}
			</Button>
		</div>
	</div>
</template>

<script>
import CheckIcon from 'vue-material-design-icons/Check'
import UndoIcon from 'vue-material-design-icons/Undo'
import TextIcon from 'vue-material-design-icons/Text'
import TextLongIcon from 'vue-material-design-icons/TextLong'
import Button from '@nextcloud/vue/dist/Components/Button'

import { fields } from '../utils'

export default {
	name: 'CreationForm',

	components: {
		CheckIcon,
		UndoIcon,
		TextIcon,
		TextLongIcon,
		Button,
	},

	props: {
	},

	data() {
		return {
			newRoom: {},
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
			this.$emit('ok-clicked', this.newRoom)
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
			> * {
				margin: 0 8px 0 8px;
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
