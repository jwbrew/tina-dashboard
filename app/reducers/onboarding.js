import { isBoolean } from 'lodash';

function onboarding(state = {
    page: 0,
    complete: false,
    form: { slug: {}, welcome: {}}
  }, action) {
  switch (action.type) {
    case 'ONBOARDING_NEXT_PAGE':
      return {
        ...state,
        page: state.page + 1
      }
    case 'ONBOARDING_UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: {
            ...state.form[action.field],
            [isBoolean(action.value) ? 'valid' : 'value']: action.value
          }
        }
      }
    case 'ONBOARDING_SETTINGS_SAVE_SUCCESS':
      return {
        ...state,
        page: 2
      }
    case 'ONBOARDING_COMPLETE':
      return {
        ...state,
        complete: true
      }
    default:
      return state
    }
}

export default onboarding
