export function startEditing() {
  return {
    type: 'SETTINGS_EDITING_START'
  }
}

export function cancelEditing() {
  return {
    type: 'SETTINGS_EDITING_CANCEL'
  }
}
