<template>
	<AppNavigation>
		<template #list>
			<AppNavigationItem
				class="addRoomItem"
				:title="t('integration_visavid', 'New room')"
				@click="onCreateRoomClick">
				<template #icon>
					<PlusIcon :size="20" />
				</template>
			</AppNavigationItem>
			<RoomNavigationItem
				v-for="room in rooms"
				:key="room.name"
				class="roomItem"
				:room="room"
				:selected="false"
				@room-clicked="onRoomClicked"
				@delete-room="onRoomDeleted"/>
		</template>
		<!--template #footer></template-->
	</AppNavigation>
</template>

<script>
import PlusIcon from 'vue-material-design-icons/Plus'
import AppNavigationItem from '@nextcloud/vue/dist/Components/AppNavigationItem'
import AppNavigation from '@nextcloud/vue/dist/Components/AppNavigation'
import RoomNavigationItem from './RoomNavigationItem'

export default {
	name: 'VisavidNavigation',

	components: {
		RoomNavigationItem,
		AppNavigationItem,
		AppNavigation,
		PlusIcon,
	},

	props: {
		rooms: {
			type: Array,
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
		onCreateRoomClick() {
			this.$emit('create-room-clicked')
		},
		onRoomClicked(room) {
			this.$emit('room-clicked', room)
		},
		onRoomDeleted(room) {
			this.$emit('delete-room', room)
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
}
</style>
