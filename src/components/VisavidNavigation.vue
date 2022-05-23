<template>
	<AppNavigation>
		<template #list>
			<AppNavigationItem
				:title="t('integration_visavid', 'New room')"
				@click="onCreateRoomClick">
				<template #icon>
					<PlusIcon :size="20" />
				</template>
			</AppNavigationItem>
		</template>
		<!--template #footer></template-->
	</AppNavigation>
</template>

<script>
import PlusIcon from 'vue-material-design-icons/Plus'
import AppNavigationItem from '@nextcloud/vue/dist/Components/AppNavigationItem'
import AppNavigation from '@nextcloud/vue/dist/Components/AppNavigation'

export default {
	name: 'VisavidNavigation',

	components: {
		AppNavigationItem,
		AppNavigation,
		PlusIcon,
	},

	props: {
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
	},
}
</script>

<style scoped lang="scss">
</style>
