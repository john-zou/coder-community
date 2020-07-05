import { ReduxAction } from "./constants"
import { GroupsApi, GetGroupSuccessDto } from "../api"
import { convertArrToMap } from "../util/helperFunctions"

const fetchGroupsBegin = (): ReduxAction => ({
  type: "GROUPS_PENDING"
})

const fetchGroupsSuccess = (groupMap, groupIDs): ReduxAction => ({
  type: "GROUPS_SUCCESS",
  payload: {
    groupMap,
    groupIDs
  }
})

const fetchGroupsFailure = (error): ReduxAction => ({
  type: "GROUPS_FAILURE",
  payload: { error }
})

export const fetchGroups = () => {
  return async function (dispatch) {
    dispatch(fetchGroupsBegin());
    try {
      const api = new GroupsApi();
      const groupArr = await api.groupsControllerGetGroups();
      const groupMap: Record<string, GetGroupSuccessDto> = convertArrToMap(groupArr);
      const groupIDs = Object.keys(groupMap);
      console.log(groupMap);
      dispatch(fetchGroupsSuccess(groupMap, groupIDs));
    }
    catch (error) {
      console.log(error);
      dispatch(fetchGroupsFailure(error));
    }
  }
}