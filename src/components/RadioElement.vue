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
			<component v-if="option.icon"
				:is="option.icon"
				class="option-icon"
				:size="20" />
			<span class="option-title">
				{{ option.label }}
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
		border-bottom: 0;
		* {
			cursor: pointer !important;
		}
		&:first-child {
			border-top-left-radius: var(--border-radius);
			border-top-right-radius: var(--border-radius);
		}
		&:last-child {
			border-bottom: 2px solid var(--color-border-dark);
			border-bottom-left-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
		}
		&:focus,
		&:hover {
			background: var(--color-background-hover);
		}
		&.selected {
			background: var(--color-primary-light-hover);
			border-color: var(--color-primary);
			border-bottom: 2px solid var(--color-primary);
		}
		&.selected + .option {
			border-top: 0;
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
