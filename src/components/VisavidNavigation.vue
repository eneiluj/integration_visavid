<template>
	<AppNavigation>
		<template #list>
			<AppNavigationNew v-if="isConfigured"
				:text="t('integration_visavid', 'Create a room')"
				button-class="icon-add"
				@click="onCreateRoomClick" />
			<RoomNavigationItem v-for="(room, id) in rooms"
				:key="id"
				class="roomItem"
				:room="room"
				:selected="room.id === selectedRoomId"
				@room-clicked="onRoomClicked"
				@delete-room="onRoomDeleted"
				@deleting-room="onDeletingRoom" />
		</template>
		<!--template #footer></template-->
	</AppNavigation>
</template>

<script>
import AppNavigationNew from '@nextcloud/vue/dist/Components/AppNavigationNew'
import AppNavigation from '@nextcloud/vue/dist/Components/AppNavigation'
import RoomNavigationItem from './RoomNavigationItem'

export default {
	name: 'VisavidNavigation',

	components: {
		RoomNavigationItem,
		AppNavigationNew,
		AppNavigation,
	},

	props: {
		rooms: {
			type: Object,
			required: true,
		},
		selectedRoomId: {
			type: Number,
			required: true,
		},
		isConfigured: {
			type: Boolean,
			required: true,
		},
	},

	data() {
		return {
		}
	},

	computed: {
	},

	watch: {
	},

	mounted() {
	},

	methods: {
		onCreateRoomClick() {
			this.$emit('create-room-clicked')
		},
		onRoomClicked(roomId) {
			this.$emit('room-clicked', roomId)
		},
		onRoomDeleted(roomId) {
			this.$emit('delete-room', roomId)
		},
		onDeletingRoom(roomId) {
			this.$emit('deleting-room', roomId)
		},
	},
}
</script>

<style scoped lang="scss">
.addRoomItem {
	border-bottom: 1px solid var(--color-border);
}

::v-deep .roomItem {
	padding-right: 0 !important;
	&.selectedRoom {
		> a,
		> div {
			background: var(--color-background-dark, lightgrey);
		}

		> a {
			font-weight: bold;
			color: var(--color-primary);
		}
	}
}
</style>
