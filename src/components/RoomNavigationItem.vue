<template>
	<AppNavigationItem v-if="deleting"
		:title="t('integration_visavid', 'Are you sure?')"
		:undo="true"
		@undo="cancelDeletion">
		<template #counter>
			<vac :end-time="new Date().getTime() + (7000)">
				<template #process="{ timeObj }">
					<span>{{ `${timeObj.s}` }}</span>
				</template>
				<!--template v-slot:finish>
					<span>Done!</span>
				</template-->
			</vac>
		</template>
	</AppNavigationItem>
	<AppNavigationItem v-else
		:title="room.name"
		:class="{ selectedRoom: selected }"
		:force-menu="false"
		@click="onRoomClick">
		<template #icon>
			<ForumIcon v-if="selected"
				:size="20" />
			<ForumOutlineIcon v-else
				:size="20" />
		</template>
		<template #actions>
			<ActionButton
				:close-after-click="true"
				@click="onDeleteClick">
				<template #icon>
					<DeleteIcon :size="20" />
				</template>
				{{ t('integration_visavid', 'Delete') }}
			</ActionButton>
		</template>
	</AppNavigationItem>
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete'
import ForumIcon from 'vue-material-design-icons/Forum'
import ForumOutlineIcon from 'vue-material-design-icons/ForumOutline'
import ClickOutside from 'vue-click-outside'

import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import AppNavigationItem from '@nextcloud/vue/dist/Components/AppNavigationItem'

import { Timer } from '../utils'

export default {
	name: 'RoomNavigationItem',
	components: {
		AppNavigationItem,
		ActionButton,
		ForumIcon,
		ForumOutlineIcon,
		DeleteIcon,
	},
	directives: {
		ClickOutside,
	},
	props: {
		room: {
			type: Object,
			required: true,
		},
		selected: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			deleting: false,
			deletionTimer: null,
		}
	},
	computed: {
	},
	beforeMount() {
	},
	methods: {
		onRoomClick(e) {
			this.$emit('room-clicked', this.room.id)
		},
		onDeleteClick() {
			this.deleting = true
			this.deletionTimer = new Timer(() => {
				this.$emit('delete-room', this.room.id)
			}, 7000)
		},
		cancelDeletion() {
			this.deleting = false
			this.deletionTimer.pause()
			delete this.deletionTimer
		},
	},
}
</script>

<style scoped lang="scss">
</style>
