<template>
	<Content app-name="integration_visavid">
		<VisavidNavigation
			:rooms="rooms"
			:selected-room-id="selectedRoomId"
			@create-room-clicked="onCreateRoomClick"
			@room-clicked="onRoomClicked"
			@delete-room="onRoomDeleted" />
		<AppContent
			:list-max-width="50"
			:list-min-width="20"
			:list-size="20"
			:show-details="false"
			@update:showDetails="a = 2">
			<!--template slot="list">
			</template-->
			<RoomDetails v-if="selectedRoom"
				:room="selectedRoom" />
			<EmptyContent v-else>
				<template #icon>
					<CheckIcon />
				</template>
				{{ t('integration_visavid', 'No selected room') }}
			</EmptyContent>
		</AppContent>
		<Modal v-if="creationModalOpen"
			size="normal"
			@close="closeCreationModal">
			<CreationForm
				@ok-clicked="onCreationValidate"
				@cancel-clicked="closeCreationModal" />
		</Modal>
	</Content>
</template>

<script>
import CheckIcon from 'vue-material-design-icons/Check'
import { generateUrl } from '@nextcloud/router'
import { basename } from '@nextcloud/paths'
import VisavidNavigation from './components/VisavidNavigation'
import AppContent from '@nextcloud/vue/dist/Components/AppContent'
import RoomDetails from './components/RoomDetails'
import Content from '@nextcloud/vue/dist/Components/Content'
import Modal from '@nextcloud/vue/dist/Components/Modal'
import EmptyContent from '@nextcloud/vue/dist/Components/EmptyContent'
import CreationForm from './components/CreationForm'

export default {
	name: 'App',

	components: {
		CreationForm,
		RoomDetails,
		VisavidNavigation,
		CheckIcon,
		AppContent,
		Content,
		Modal,
		EmptyContent,
	},

	props: {
	},

	data() {
		return {
			creationModalOpen: false,
			rooms: {},
			selectedRoomId: 0,
		}
	},

	watch: {
	},

	mounted() {
	},

	computed: {
		selectedRoom() {
			return this.rooms[this.selectedRoomId]
		},
	},

	methods: {
		onCreateRoomClick() {
			this.creationModalOpen = true
		},
		closeCreationModal() {
			this.creationModalOpen = false
		},
		onCreationValidate(room) {
			console.debug('CREATE', room)
			this.creationModalOpen = false
			const nbRooms = Object.values(this.rooms).length
			room.id = nbRooms + 1
			this.$set(this.rooms, room.id, room)
			console.debug(this.rooms)
		},
		onRoomClicked(roomId) {
			console.debug('select room', roomId)
			this.selectedRoomId = roomId
		},
		onRoomDeleted(roomId) {
			console.debug('DELETE room', roomId)
			this.$delete(this.rooms, roomId)
		},
	},
}
</script>

<style scoped lang="scss">
::v-deep #content-vue {
	padding-top: 0 !important;
}
// TODO in global css loaded by main
body {
	min-height: 100%;
	height: auto;
}
</style>
