<script lang="ts" setup>
	import type { Aisle } from '@models/index';

	import Checkbox from 'primevue/checkbox';

	interface ShoppingItemState {
		aisle: Aisle;
		isShoppingMode: boolean;
	}

	const props = defineProps<ShoppingItemState>();
</script>

<template>
	<h3 class="mt-1">{{ aisle.name }}</h3>
	<ul :class="{ 'list-none pl-0 shopping-list': isShoppingMode }">
		<template v-for="item in props.aisle.items" :key="item.name">
			<template v-if="isShoppingMode">
				<li class="shopping-list__item">
					<Checkbox
						v-model="item.isInCart"
						:input-id="item.name + item.groceryItemId"
						class="mr-1"
						binary
						@change="$emit('item-click', aisle.aisleOrder)"
					/>
					<label :for="item.name + item.groceryItemId">{{ item.name }}</label>
				</li>
			</template>
			<template v-else>
				<li>{{ item.name }}</li>
			</template>
		</template>
	</ul>
</template>
