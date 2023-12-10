<template>
  <div class="w-56">
    <Listbox v-model="selectedlang">
      <div class="relative mt-1">
        <ListboxButton
          class="relative flex justify-start items-center space-x-3 w-full cursor-default bg-white dark:bg-zinc-700 dark:text-zinc-50 py-3 pl-3 pr-10 text-left rounded-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <div class="flex items-center space-x-2">
            <Icon :icon="selectedlang.icon" class="w-5 h-5" />
            <span class="block truncate">{{ selectedlang.name }}</span>
          </div>
          <span class="pointer-events-none flex items-center pr-2">
            <Icon
              icon="eva:arrow-ios-downward-fill"
              class="w-5 h-5 rotate-180"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute bottom-14 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="lang in Language"
              :key="lang.name"
              :value="lang"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-zinc-900 dark:text-zinc-50',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ lang.name }}</span
                >
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                >
                  <Icon :icon="lang.icon" class="w-5 h-5" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const Language = [
  {
    name: "English",
    icon: "emojione:flag-england",
  },
  { name: "Spanish", icon: "emojione:flag-for-spain" },
  { name: "German", icon: "emojione:flag-for-germany" },
  { name: "Japanese", icon: "emojione:flag-for-japan" },
  { name: "French", icon: "emojione:flag-for-france" },
];
const selectedlang = ref(Language[0]);
</script>
