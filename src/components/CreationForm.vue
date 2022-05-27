<template>
	<div class="creationForm">
		<h2>
			{{ t('integration_visavid', 'Create a room') }}
		</h2>
		<div class="fields">
			<div v-for="(field, fieldId) in fields"
				:key="fieldId"
				class="field">
				<component :is="field.icon"
					v-if="field.icon"
					:size="20" />
				<label :for="'room-' + fieldId">
					{{ field.label }}
				</label>
				<input v-if="field.type === 'text'"
					:id="'room-' + fieldId"
					v-model="newRoom[fieldId]"
					type="text"
					:placeholder="field.placeholder">
				<textarea v-else-if="field.type === 'textarea'"
					:id="'room-' + fieldId"
					v-model="newRoom[fieldId]"
					:placeholder="field.placeholder" />
				<Multiselect v-else-if="field.type === 'select'"
					:value="newRoom[fieldId]"
					:options="Object.values(field.options)"
					label="label"
					:placeholder="field.placeholder"
					@input="setSelectValue(fieldId, $event)"
					@search-change="query = $event">
					<template #option="{option}">
						<component :is="option.icon"
							v-if="option.icon"
							class="option-icon"
							:size="20" />
						<Highlight :text="option.label" :search="query" class="option-title multiselect-option-title" />
					</template>
					<template #singleLabel="{option}">
						<component :is="option.icon"
							v-if="option.icon"
							class="multiselect-label-icon"
							:size="20" />
						<span class="option-title">
							{{ option.label }}
						</span>
					</template>
				</Multiselect>
				<RadioElement v-else-if="field.type === 'radio'"
					:field-id="fieldId"
					:options="field.options"
					:value="newRoom[fieldId]"
					@update:value="newRoom[fieldId] = $event">
					<!--template #icon="{option}">
						{{ option.label }}
					</template-->
					<!--template #label="{option}">
						lala
					</template-->
				</RadioElement>
				<div v-else-if="field.type === 'ncradio'">
					<CheckboxRadioSwitch v-for="(option, id) in field.options"
						:key="id"
						:checked.sync="newRoom[fieldId]"
						:value="id"
						:name="fieldId + '_radio'"
						type="radio"
						class="ncradio">
						<component :is="option.icon"
							v-if="option.icon"
							class="option-icon"
							:size="20" />
						<span class="option-title">
							{{ option.label }}
						</span>
					</CheckboxRadioSwitch>
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
import CheckIcon from 'vue-material-design-icons/Check'
import UndoIcon from 'vue-material-design-icons/Undo'
import Button from '@nextcloud/vue/dist/Components/Button'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import Highlight from '@nextcloud/vue/dist/Components/Highlight'
import CheckboxRadioSwitch from '@nextcloud/vue/dist/Components/CheckboxRadioSwitch'
import { showError } from '@nextcloud/dialogs'

import { fields } from '../utils'
import RadioElement from './RadioElement'

export default {
	name: 'CreationForm',

	components: {
		RadioElement,
		CheckIcon,
		UndoIcon,
		Button,
		Multiselect,
		Highlight,
		CheckboxRadioSwitch,
	},

	props: {
	},

	data() {
		return {
			// newRoom: { style: fields.style.default, permissions: fields.permissions.default },
			newRoom: {},
			fields,
			query: '',
		}
	},

	computed: {
	},

	watch: {
	},

	beforeMount() {
		const roomWithDefaults = {}
		Object.keys(fields).forEach((fieldId) => {
			roomWithDefaults[fieldId] = fields[fieldId].default
		})
		this.newRoom = {
			...roomWithDefaults,
		}
	},

	mounted() {
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
				this.$emit('ok-clicked', {
					...this.newRoom,
					type: this.newRoom.type.id,
				})
			}
		},
		setSelectValue(fieldId, newValue) {
			// this fixes the issue when selecting the currently select option
			if (newValue !== null) {
				this.$set(this.newRoom, fieldId, newValue)
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
		.field {
			display: flex;
			align-items: center;
			margin: 5px 0 5px 0;
			> * {
				margin: 0 8px 0 8px;
				&:last-child {
					width: 250px;
				}
			}
			label {
				width: 150px;
			}
			.option-icon {
				margin-left: 4px;
				margin-right: 8px;
			}
			.multiselect-label-icon {
				margin-right: 12px;
			}
			.option-title {
				// nothing
			}
			.multiselect-option-title {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			textarea {
				height: 65px;
			}
			// this fixes the multiline radio label
			::v-deep .ncradio > label {
				height: unset !important;
				min-height: 44px;
				> * {
					margin-top: 8px;
					margin-bottom: 8px;
				}
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
