export function useSuccessToast(title: string, color?: string, description?: string) {
  const toast = useToast()

  toast.add({
    title,
    description,
    color: color || 'green',
    icon: 'i-ph:check-circle-duotone',
  })
}

export function useErrorToast(title: string, description?: string) {
  const toast = useToast()

  toast.add({
    title,
    description,
    color: 'red',
    icon: 'i-ph:x-circle-duotone',
  })
}
