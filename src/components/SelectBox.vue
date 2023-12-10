<template>
  <div class="w-full relative z-50">
    <Listbox v-model="selectedOption">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white dark:bg-zinc-700 dark:text-white py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedOption }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <!-- <ChevronUpDownIcon
              class="h-5 w-5 text-zinc-400"
              aria-hidden="true"
            /> -->
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.id"
              :value="option.name"
              as="template"
            >
              <li
                @click="$emit('onChange', option)"
                :class="[
                  active ? 'bg-green-100 text-green-900' : 'text-zinc-900 dark:text-white',
                  'relative cursor-default select-none p-2',
                ]"
                :title="option.name"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.name }}</span
                >
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const { options, selectedOption: initialSelectedOption } = defineProps([
  "options",
  "selectedOption",
]);
const selectedOption = ref(initialSelectedOption || "Select");
const emit = defineEmits(["onChange"]);
</script>
