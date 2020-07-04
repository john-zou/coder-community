import { ReduxAction } from "./constants"

const fetchTagsBegin = () => ({
  type: "TAGS_BEGIN",
})

const fetchTagsSuccess = (tags): ReduxAction => ({
  type: "TAGS_SUCCESS",
  payload: tags,
})

const fetchTagsFailure = (error): ReduxAction => ({
  type: "TAGS_FAILURE"
})

export const setTags = () => {
  return async function (dispatch) {
    dispatch(fetchTagsBegin());
    try {
      const tags =
        dispatch(fetchTagsSuccess(tags));
    }
    catch (error) {
      dispatch(fetchTagsFailure(error))
    }
  }
}