<template>
    <v-container class="m-0 py-0 px-0">
        <v-tabs class="tab_border" v-model="activeTab" show-arrows @update:modelValue="onTabSelected">
            <!-- <Tooltip  text="This is a custom tooltip" /> -->
             <!-- <span class="tooltip">Central Board of Education</span> -->
            <v-tab class="tab_content" v-for="(tab, index) in tabs" :key="index"
                :class="{ 'v-tab--selected': activeTab === index, 'tab_content_selected': activeTab == index }">
                {{ tab.name }}
            </v-tab>
        </v-tabs>
    </v-container>
</template>

<script setup>
import { ref, defineEmits  } from 'vue'

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    }
})

const activeTab = ref(0)

// Emit event
const emit = defineEmits(['tabSelected'])

// Method to handle tab selection
const onTabSelected = (value) => {
    const selectedTab = props.tabs[value]
    if (selectedTab) {
        emit('tabSelected', selectedTab.slug) // Emit the selected tab's slug
    }
}
</script>

<style scoped>
.tab_content:hover {
    color: #000 !important;
    border-bottom: 2px solid #000;
}
.tooltip {
    position: absolute;
    left: 0;
}

.tab_content {
    color: #757373 !important;
    font-weight: 600;
    font-size: 18px;
}

.tab_content_selected {
    color: #000 !important;
    font-weight: 600;
    text-shadow: -1px 3px 3px #00000070;
    border-bottom: 2px solid #000;
}
</style>