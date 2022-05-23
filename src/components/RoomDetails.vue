<template>
	<div class="roomDetails">
		<h2>
			{{ room.name }}
		</h2>
		<div class="fields">
			<div v-for="field in fields"
				 :key="field.id"
				 class="field">
				<div v-if="field.type === 'text'">
					<TextIcon :size="20" />
					<label>
						{{ field.label }}
					</label>
					<label :id="'room-' + field.id + '-value'">
						{{ room[field.id] }}
					</label>
				</div>
				<div v-else-if="field.type === 'textarea'">
					<TextLongIcon :size="20" />
					<label>
						{{ field.label }}
					</label>
					<label :for="'room-' + field.id + '-value'">
						{{ room[field.id] }}
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fields } from '../utils'
import TextIcon from 'vue-material-design-icons/Text'
import TextLongIcon from 'vue-material-design-icons/TextLong'

export default {
	name: 'RoomDetails',

	components: {
		TextLongIcon,
		TextIcon,
	},

	props: {
		room: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
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
	},
}
</script>

<style scoped lang="scss">
.roomDetails {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.fields {
		display: flex;
		flex-direction: column;
		.field > * {
			display: flex;
			align-items: center;
		}
	}
}
</style>
