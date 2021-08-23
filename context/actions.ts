export async function loginUser(dispatch, data) {
  console.log(data);
  dispatch({ type: "LOGIN_SUCCESS", payload: data });
  localStorage.setItem("currentUser", JSON.stringify(data));
  return data;
}
