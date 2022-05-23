<template>
	<div class="creationForm">
		<h2>
			{{ t('integration_visavid', 'Create a room') }}
		</h2>
		<div class="fields">
			<div class="field">
				<TextIcon :size="20" />
				<label for="room-name">
					{{ t('integration_visavid', 'Room name') }}
				</label>
				<input id="room-name"
					v-model="name"
					type="text"
					:placeholder="t('integration_visavid', 'Room name')" />
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
import Button from '@nextcloud/vue/dist/Components/Button'

export default {
	name: 'CreationForm',

	components: {
		CheckIcon,
		UndoIcon,
		TextIcon,
		Button,
	},

	props: {
	},

	data() {
		return {
			name: '',
			comment: '',
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
			const room = {
				name: this.name,
				comment: this.comment,
			}
			this.$emit('ok-clicked', room)
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
