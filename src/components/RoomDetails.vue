<template>
	<div class="roomDetails">
		<h2>
			{{ room.name }}
		</h2>
		<div class="links">
			<div class="link">
				<LinkVariantIcon :size="20" />
				<label>
					{{ t('integration_visavid', 'Public room link') }}
				</label>
				<input type="text" :readonly="true" :value="publicLink" />
				<a :href="publicLink" @click.prevent.stop="copyLink(false)">
					<Button v-tooltip.bottom="{ content: t('integration_visavid', 'Copy to clipboard') }">
						<template #icon>
							<ClipboardCheckOutlineIcon v-if="publicLinkCopied"
								class="copiedIcon"
								:size="20" />
							<ClipboardArrowLeftOutlineIcon v-else
								:size="20" />
						</template>
					</Button>
				</a>
			</div>
			<div class="link">
				<ShieldLinkVariantIcon :size="20" />
				<label>
					{{ t('integration_visavid', 'Admin room link') }}
				</label>
				<input type="text" :readonly="true" :value="adminLink" />
				<a :href="adminLink" @click.prevent.stop="copyLink(true)">
					<Button v-tooltip.bottom="{ content: t('integration_visavid', 'Copy to clipboard') }">
						<template #icon>
							<ClipboardCheckOutlineIcon v-if="adminLinkCopied"
								class="copiedIcon"
								:size="20" />
							<ClipboardArrowLeftOutlineIcon v-else
								:size="20" />
						</template>
					</Button>
				</a>
			</div>
		</div>
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
				<div v-else-if="field.type === 'select'">
					<FormatListBulletedTypeIcon :size="20" />
					<label>
						{{ field.label }}
					</label>
					<label :for="'room-' + field.id + '-value'">
						{{ room[field.id].label }}
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fields, Timer } from '../utils'
import ShieldLinkVariantIcon from 'vue-material-design-icons/ShieldLinkVariant'
import LinkVariantIcon from 'vue-material-design-icons/LinkVariant'
import TextIcon from 'vue-material-design-icons/Text'
import TextLongIcon from 'vue-material-design-icons/TextLong'
import FormatListBulletedTypeIcon from 'vue-material-design-icons/FormatListBulletedType'
import ClipboardArrowLeftOutlineIcon from 'vue-material-design-icons/ClipboardArrowLeftOutline'
import ClipboardCheckOutlineIcon from 'vue-material-design-icons/ClipboardCheckOutline'

import Button from '@nextcloud/vue/dist/Components/Button'
import { showSuccess, showError } from '@nextcloud/dialogs'

export default {
	name: 'RoomDetails',

	components: {
		TextLongIcon,
		TextIcon,
		FormatListBulletedTypeIcon,
		LinkVariantIcon,
		ShieldLinkVariantIcon,
		ClipboardArrowLeftOutlineIcon,
		ClipboardCheckOutlineIcon,
		Button,
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
			adminLinkCopied: false,
			publicLinkCopied: false,
		}
	},

	watch: {
	},

	mounted() {
	},

	computed: {
		publicLink() {
			return 'https://public/' + this.room.name + '/PUBLIC_TOKEN'
		},
		adminLink() {
			return 'https://admin/' + this.room.name + '/ADMIN_TOKEN'
		},
	},

	methods: {
		async copyLink(admin = false) {
			const link = admin
				? this.adminLink
				: this.publicLink
			try {
				await this.$copyText(link)
				if (admin) {
					this.adminLinkCopied = true
					showSuccess(t('integration_visavid', 'Admin link copied!'))
				} else {
					this.publicLinkCopied = true
					showSuccess(t('integration_visavid', 'Public link copied!'))
				}
				// eslint-disable-next-line
				new Timer(() => {
					if (admin) {
						this.adminLinkCopied = false
					} else {
						this.publicLinkCopied = false
					}
				}, 5000)
			} catch (error) {
				console.error(error)
				showError(t('integration_visavid', 'Link could not be copied to clipboard'))
			}
		},
	},
}
</script>

<style scoped lang="scss">
.roomDetails {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h2 {
		margin: 12px 0 32px 0;
	}
	.fields {
		display: flex;
		flex-direction: column;
		.field > * {
			display: flex;
			align-items: center;
			margin: 5px 0 5px 0;
			> * {
				margin: 0 8px 0 8px;
			}
			label {
				width: 150px;
			}
		}
	}
	.links {
		display: flex;
		flex-direction: column;
		.link {
			display: flex;
			align-items: center;
			margin: 6px 0 6px 0;
			> * {
				margin: 0 8px 0 8px;
			}
			label {
				width: 150px;
			}
			input {
				width: 250px;
			}
			.copiedIcon {
				color: var(--color-success);
			}
		}
	}
}
</style>
