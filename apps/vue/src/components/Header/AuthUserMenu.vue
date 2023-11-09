<script setup lang="ts">
import { ref, Ref } from "vue";

import Skeleton from "primevue/skeleton";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menu, { MenuProps } from "primevue/menu";
import { useClerk, useUser, useAuth } from "vue-clerk";
import { appearance } from "@/clerk";

const { signOut } = useAuth();
const { isLoaded, user } = useUser();
const { openSignIn } = useClerk();

const handleSignIn = () => {
  openSignIn({
    afterSignInUrl: "/dashboard",
    afterSignUpUrl: "/dashboard",
    appearance,
  });
};

const menuRef = ref();

const menuItems: Ref<MenuProps["model"]> = ref([
  {
    label: "Menu",
    items: [
      {
        label: "Create new link",
        icon: "pi pi-plus",
        route: "/new",
      },
      {
        label: "Dashboard",
        icon: "pi pi-home",
        route: "/dashboard",
      },
      {
        label: "Sign Out",
        icon: "pi pi-sign-out",
        className: "text-red-400",
        command: () => {
          signOut.value();
        },
      },
    ],
  },
]);

const toggle = (event: MouseEvent) => {
  menuRef.value.toggle(event);
};
</script>

<template>
  <Skeleton v-if="!isLoaded" shape="circle" size="2.5rem" />
  <Button
    icon="pi pi-user"
    size="small"
    v-else-if="isLoaded && !user"
    @click="handleSignIn"
    label="Login"
  />
  <Avatar
    @click="toggle"
    role="button"
    v-else-if="isLoaded && user"
    :image="user.imageUrl"
    class="w-[2.5rem] h-[2.5rem] cursor-pointer"
    shape="circle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Menu
    class="!left-auto !right-0 !top-12"
    append-to="header .container"
    ref="menuRef"
    id="overlay_menu"
    :model="menuItems"
    :popup="true"
  >
    <template #item="{ label, item, props }">
      <router-link
        v-if="item.route"
        v-slot="routerProps"
        :to="item.route"
        custom
      >
        <a
          :href="routerProps.href"
          v-bind="props.action"
          @click="routerProps.navigate"
        >
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ label }}</span>
        </a>
      </router-link>
      <span v-else role="button" v-bind="props.action">
        <span :class="item.className" v-bind="props.icon" />
        <span :class="item.className" v-bind="props.label">{{ label }}</span>
      </span>
    </template>
  </Menu>
</template>
