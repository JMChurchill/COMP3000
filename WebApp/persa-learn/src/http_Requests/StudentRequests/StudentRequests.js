export const checkTokenCorrect = (status) => {
  status.then((value) => {
    // console.log(value.errors[0].message);
    // ask to log back in if token invalid
    if (
      value.hasOwnProperty("errors") &&
      value.errors[0].message === "Invalid Token"
    ) {
      sessionStorage.clear();
      window.location.reload();
    }
  });
};

export const updateProfilePicture = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/student/profilePic", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const updateBanner = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/student/banner", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
