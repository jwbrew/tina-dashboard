
function onboarding(state = {
    page: 0
  }, action) {
  switch (action.type) {
    case 'ONBOARDING_NEXT_PAGE':
    case 'USER_METADATA_SAVE_SUCCESS':
      return {
        ...state,
        page: state.page + 1
      }
    default:
      return state
    }
}

export default onboarding
