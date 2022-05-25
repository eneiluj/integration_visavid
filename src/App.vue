<template>
	<Content app-name="integration_visavid">
		<VisavidNavigation
			:rooms="rooms"
			:selected-room-id="selectedRoomId"
			:is-configured="state.is_configured"
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
			<EmptyContent v-else-if="!state.is_configured">
				<template #icon>
					<CogIcon />
				</template>
				{{ t('integration_visavid', 'Application is not configured') }}
				<a v-if="currentUser.isAdmin"
				   :href="configureUrl">
					<Button
						class="configureButton">
						<template #icon>
							<CogIcon />
						</template>
						{{ t('integration_visavid', 'Configure Visavid integration') }}
					</Button>
				</a>
				<p v-else>
					{{ t('integration_visavid', 'Ask your administrator to configure this integration') }}
				</p>
			</EmptyContent>
			<EmptyContent v-else-if="roomCount === 0">
				<template #icon>
					<VisavidIcon />
				</template>
				{{ t('integration_visavid', 'No room') }}
				<Button
					class="createButton"
					@click="onCreateRoomClick">
					<template #icon>
						<PlusIcon />
					</template>
					{{ t('integration_visavid', 'Create a room') }}
				</Button>
			</EmptyContent>
			<EmptyContent v-else>
				<template #icon>
					<VisavidIcon />
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
import CogIcon from 'vue-material-design-icons/Cog'
import PlusIcon from 'vue-material-design-icons/Plus'
import CheckIcon from 'vue-material-design-icons/Check'
import Button from '@nextcloud/vue/dist/Components/Button'
import AppContent from '@nextcloud/vue/dist/Components/AppContent'
import Content from '@nextcloud/vue/dist/Components/Content'
import Modal from '@nextcloud/vue/dist/Components/Modal'
import EmptyContent from '@nextcloud/vue/dist/Components/EmptyContent'

import { generateUrl } from '@nextcloud/router'
import { basename } from '@nextcloud/paths'
import { loadState } from '@nextcloud/initial-state'
import { getCurrentUser } from '@nextcloud/auth'

import VisavidNavigation from './components/VisavidNavigation'
import CreationForm from './components/CreationForm'
import RoomDetails from './components/RoomDetails'
import VisavidIcon from './components/VisavidIcon'

export default {
	name: 'App',

	components: {
		VisavidIcon,
		CreationForm,
		RoomDetails,
		VisavidNavigation,
		CheckIcon,
		CogIcon,
		PlusIcon,
		AppContent,
		Content,
		Modal,
		EmptyContent,
		Button,
	},

	props: {
	},

	data() {
		return {
			creationModalOpen: false,
			rooms: {},
			selectedRoomId: 0,
			state: loadState('integration_visavid', 'page-state'),
			currentUser: getCurrentUser(),
			configureUrl: generateUrl('/settings/admin/connected-accounts'),
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
		roomCount() {
			return Object.keys(this.rooms).length
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
			this.selectedRoomId = room.id
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

.createButton,
.configureButton {
	margin-top: 12px;
}
</style>
