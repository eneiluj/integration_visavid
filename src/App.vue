<template>
	<Content app-name="integration_visavid">
		<VisavidNavigation
			:selected-room-id="2"
			@create-room-clicked="onCreateRoomClick"
			@room-clicked=""
			@delete-room="" />
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
			plop modal
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

export default {
	name: 'App',

	components: {
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
			this.creationModalOpen = true
		},
		closeCreationModal() {
			this.creationModalOpen = false
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
