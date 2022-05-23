<template>
	<div class="roomDetails">
		<h2>
			{{ room.name }}
		</h2>
	</div>
</template>

<script>
export default {
	name: 'RoomDetails',

	components: {
	},

	props: {
		room: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
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
	align-items: center;
	justify-content: center;
}
</style>
