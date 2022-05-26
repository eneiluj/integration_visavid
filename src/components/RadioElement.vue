<template>
	<fieldset class="option-list">
		<label v-for="(option, optionId) in options"
			:key="optionId"
			:class="{ option: true, selected: value === optionId }"
			:style="{ '--border-radius': borderRadius ? borderRadius + 'px' : borderRadius }"
			:for="fieldId + '-' + optionId"
			@click="onUpdateValue(optionId)">
			<input :id="fieldId + '-' + optionId"
				type="radio"
				name="permission"
				:value="optionId">
			<span class="option-icon">
				<slot name="icon" :option="option">
					<component v-if="option.icon"
						:is="option.icon"
						:size="20" />
				</slot>
			</span>
			<span class="option-title">
				<slot name="label" :option="option">
					{{ option.label }}
				</slot>
			</span>
		</label>
	</fieldset>
</template>

<script>
export default {
	name: 'RadioElement',
	props: {
		options: {
			type: Object,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		// to make sure the sub ids are unique
		fieldId: {
			type: String,
			required: true,
		},
		borderRadius: {
			type: Number,
			default: undefined,
		},
	},

	methods: {
		onUpdateValue(newValue) {
			this.$emit('update:value', newValue)
		},
	},
}
</script>

<style scoped lang="scss">
.option-list {
	display: flex;
	flex-direction: column;
	margin: 44px 0 44px 0;
	.option {
		display: flex;
		align-items: center;
		height: 44px;
		border: 2px solid var(--color-border-dark);
		// no bottom borders to avoid double borders between elements
		border-bottom: 0;
		* {
			cursor: pointer !important;
		}
		&:first-child {
			border-top-left-radius: var(--border-radius);
			border-top-right-radius: var(--border-radius);
		}
		&:last-child {
			border-bottom-left-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			// last element must have a border
			border-bottom: 2px solid var(--color-border-dark);
		}
		&:focus,
		&:hover {
			background: var(--color-background-hover);
			// hovered elements have a bottom border and we remove the one of the following element
			border: 2px solid var(--color-primary-element-light);
			& + .option {
				border-top: 0;
			}
		}
		&.selected {
			background: var(--color-primary-light);
			// selected element has a bottom border and we remove the one of the following element
			border: 2px solid var(--color-primary-element-light);
			&:hover {
				background: var(--color-primary-light-hover);
				border: 2px solid var(--color-primary);
			}
			& + .option {
				border-top: 0;
			}
		}
		input {
			// display: none;
			opacity: 0;
			width: 0;
			margin: 0;
		}
		.option-icon {
			margin: 0 12px 0 12px;
		}
	}
}
</style>
