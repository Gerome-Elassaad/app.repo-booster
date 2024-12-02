<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

// Navigation links for the sidebar
const links = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Dashboard Overview',
      shortcuts: ['G', 'H']
    }
  },
  {
    id: 'repositories',
    label: 'Repositories',
    icon: 'i-heroicons-database',
    to: '/inbox',
    tooltip: {
      text: 'View and Manage Repositories',
      shortcuts: ['G', 'R']
    }
  },
  {
    id: 'traffic',
    label: 'Traffic Analytics',
    icon: 'i-heroicons-chart-bar',
    to: '/traffic',
    tooltip: {
      text: 'Analyze Traffic Insights',
      shortcuts: ['G', 'T']
    }
  },
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      { label: 'General', to: '/settings', exact: true },
      { label: 'API Integrations', to: '/settings/api' },
      { label: 'Notifications', to: '/settings/notifications' }
    ],
    tooltip: {
      text: 'Manage Settings',
      shortcuts: ['G', 'S']
    }
  }
]

// Footer links for quick actions
const footerLinks = [
  {
    label: 'Invite Collaborators',
    icon: 'i-heroicons-user-add',
    to: '/settings/invite'
  },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true)
  }
]

// Command palette groups
const groups = [
  {
    key: 'links',
    label: 'Quick Navigation',
    commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
  },
  {
    key: 'repo',
    label: 'Repository Tools',
    commands: [
      {
        id: 'source',
        label: 'View Source on GitHub',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(
            `https://github.com/repo-booster/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`,
            '_blank'
          )
        }
      }
    ]
  }
]

// Theme customization options
const defaultColors = ref(
  ['green', 'blue', 'purple', 'orange', 'red', 'teal'].map(color => ({
    label: color,
    chip: color,
    click: () => (appConfig.ui.primary = color)
  }))
)
const colors = computed(() =>
  defaultColors.value.map(color => ({
    ...color,
    active: appConfig.ui.primary === color.label
  }))
)
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="260"
      :resizable="{ min: 200, max: 320 }"
      collapsible
    >
      <!-- Navbar -->
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <!-- Sidebar -->
      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <!-- Sidebar Links -->
        <UDashboardSidebarLinks :links="links" />

        <!-- Divider -->
        <UDivider />

        <!-- Customizable Colors -->
        <UDashboardSidebarLinks
          :links="[{ label: 'Themes', draggable: true, children: colors }]"
          @update:links="newColors => (defaultColors.values = newColors)"
        />

        <div class="flex-1" />

        <!-- Footer Links -->
        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <!-- Footer -->
        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <!-- Slot for Page Content -->
    <slot />

    <!-- Help Slideover -->
    <HelpSlideover />
    <!-- Notifications Slideover -->
    <NotificationsSlideover />

    <!-- Command Palette -->
    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
