export default defineAppConfig({
  ui: {
    gray: 'zinc',
    primary: 'red',
    notifications: {
      position: 'bottom-0 right-0',
    },
    input: {
      color: {
        white: {
          outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-500',
        },
      },
    },
    select: {
      color: {
        white: {
          outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-500',
        },
      },
    },
    textarea: {
      color: {
        white: {
          outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-500',
        },
      },
    },
    avatar: {
      size: {
        '5xl': 'h-24 w-24 text-5xl',
      },
    },
  },
})
