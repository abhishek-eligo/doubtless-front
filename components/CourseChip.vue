<template>
  <div class="chip-carousel">
    <v-row no-gutters>
      <v-col class="chip_container" cols="11">
        <div class="d-flex gap-3">
          <div class="chipWidth px-0 py-0" v-for="(item, index) in visibleItems" :key="index"
            :class="{ slideLeft: slidingLeft, slideRight: slidingRight }">
            <v-btn class="chip-button" id="course-chip" :class="selectedChip === index ? 'bgChipActive' : 'bgChipUnactive'"
              @click="setActiveChip(index, item.slug)">
              {{ item.name }}
              <br />
              <span :class="selectedChip != index ? 'chip_text_color' : ''">Learn All Courses</span>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col class="arrow_button justify-content-end" cols="1">
        <!-- 👉 Prev Button -->
        <v-btn  v-if="canSlideLeft" icon @click="slideLeft">
          <v-icon class="btnIcon">mdi-chevron-left</v-icon>
        </v-btn>
        <!-- 👉 Next Button -->
        <v-btn icon @click="slideRight" v-if="canSlideRight">
          <v-icon class="btnIcon">mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// const selectedChipIndex = ref(0);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  visibleCount: {
    type: Number,
    default: 9,
  },
  reset: {
    type: Boolean,
    default: false,
  },
});

const currentStart = ref(0);
const slidingLeft = ref(false);
const slidingRight = ref(false);
const selectedChip = ref(0); // Default first chip active

const visibleItems = computed(() => {
  return props.items.slice(currentStart.value, currentStart.value + props.visibleCount);
});

const canSlideRight = computed(() => {
  return currentStart.value + props.visibleCount < props.items.length;
});

watch(() => props.reset, (newValue) => {
  if (newValue) {
    selectedChip.value = 0;
  }
});

const canSlideLeft = computed(() => {
  return currentStart.value > 0;
});

const slideRight = () => {
  if (canSlideRight.value) {
    slidingRight.value = true;
    setTimeout(() => {
      currentStart.value++;
      slidingRight.value = false;
    }, 200);
  }
};

const slideLeft = () => {
  if (canSlideLeft.value) {
    slidingLeft.value = true;
    setTimeout(() => {
      currentStart.value--;
      slidingLeft.value = false;
    }, 200);
  }
};

const emit = defineEmits(['chipSelected'])

const setActiveChip = (index, slug) => {
  selectedChip.value = index;
  if (slug) {
    emit('chipSelected', slug);  // Emit the selected chip's slug
    console.log('Selected Chip Slug:', slug);  // Log the slug of the selected chip
  } else {
    console.error('Slug is undefined for this chip.'); // Error handling if slug is missing
  }
};
</script>

<style scoped>
.chip-button {
    border-radius: 50px;
    padding: 10px 30px !important;
    height: unset !important;
    box-shadow: unset;
}
.chip-carousel {
  align-items: center;
}

.slideLeft {
  animation: slideToRight 0.3s forwards;
}

.slideRight {
  animation: slideToLeft 0.3s forwards;
}

.chip_text_color {
  color: #797979;
  text-transform: capitalize;
}

@keyframes slideToLeft {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slideToRight {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
