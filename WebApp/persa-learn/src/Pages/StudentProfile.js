import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Link,
} from "react-router-dom";

import ClassItem from "../Components/StudentProfile/ClassItem";
import AssignmentItem from "../Components/StudentProfile/AssignmentItem";
import Banner from "../Components/StudentProfile/Banner";

import {
  getStudentsAssignmentQuizzes,
  getStudentsClassses,
  getUserDetails,
} from "../http_Requests/userRequests";

import styles from "./StudentProfile.module.css";
import { getFeedRequest } from "../http_Requests/StudentRequests/FeedRoutes";
import ResultsItem from "../Components/StudentProfile/ResultsItem";

const StudentProfile = () => {
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [feed, setFeed] = useState([]);

  const [usersName, setUsersName] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);

  const [profilePicture, setProfilePicture] = useState();
  const [banner, setBanner] = useState(0);
  const [xp, setXp] = useState(0);
  const [requiredXp, setRequiredXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [coins, setCoins] = useState(0);
  const [className, setClassName] = useState(0);

  const tabs = ["Assignments", "Feed", "Classes"];
  useEffect(async () => {
    //get page details
    const [dataClasses, dataStudentDetails, dataAssignment, dataFeed] =
      await Promise.all([
        getStudentsClassses(),
        getUserDetails(),
        getStudentsAssignmentQuizzes(),
        getFeedRequest(),
      ]);

    if (dataClasses.hasOwnProperty("data")) {
      setClasses(dataClasses.data);
    }
    //student details
    if (dataStudentDetails.hasOwnProperty("data")) {
      const {
        FirstName,
        LastName,
        Email,
        Coins,
        Xp,
        RequiredXp,
        Level,
        ProfilePicture,
        Banner,
      } = dataStudentDetails.data;
      setUsersName(`${FirstName} ${LastName}`);
      setXp(Xp);
      setRequiredXp(RequiredXp);
      setLevel(Level);
      setCoins(Coins);
      setBanner(Banner);
      setProfilePicture(ProfilePicture);
    }
    // assignments
    if (dataAssignment.hasOwnProperty("quizzes")) {
      console.log(dataAssignment);
      setAssignments(dataAssignment.quizzes);
    }
    if (dataFeed.status === "success") {
      console.log(dataFeed.data);
      setFeed(dataFeed.data);
    }
  }, []);

  return (
    <div className="content-box">
      {/* <div className="container wide-container center-container"> */}
      <h1>Student profile</h1>
      {/* <div className="container wide-container center-container"> */}
      <div className={styles.container}>
        <Banner
          banner={banner}
          level={level}
          profilePicture={profilePicture}
          usersName={usersName}
          coins={coins}
          xp={xp}
          requiredXp={requiredXp}
        />
        {/* <div className="content"> */}
        <div className={styles.content}>
          <div className={styles.tabs}>
            {tabs.map((tab, i) => {
              // highlight selected tab
              let isSelected = false;
              let j = i + 1;
              if (j === selectedTab) {
                isSelected = true;
              }
              return (
                <h3
                  key={j}
                  aria-selected={isSelected}
                  onClick={() => setSelectedTab(j)}
                >
                  {tab}
                </h3>
              );
            })}
          </div>
          {selectedTab == 1 ? (
            <>
              <div className={styles.column_names}>
                <p>Name</p>
                <p>Class</p>
                <p>Teacher</p>
                <p>Module</p>
                <p>Due Date</p>
              </div>
              <div className={styles.list_items}>
                {assignments.map((a, i) => (
                  <AssignmentItem
                    key={i}
                    id={a.QuizID}
                    className={a.ClassName}
                    assignmentName={a.QuizName}
                    teacherName={`${a.FirstName} ${a.LastName}`}
                    ModuleName={a.ModuleName}
                    Caption={a.Caption}
                    dueDate={a.DueDate}
                  />
                ))}
              </div>
            </>
          ) : (
            <></>
          )}

          {selectedTab == 2 ? (
            <div className={styles.list_items}>
              {feed.map((item, i) => {
                if (item.Caption === "Assignment") {
                  return (
                    <AssignmentItem
                      key={i}
                      id={item.QuizID}
                      className={item.className}
                      assignmentName={item.quizName}
                      teacherName={`${item.firstname} ${item.lastname}`}
                      ModuleName={item.moduleName}
                      Caption={item.Caption}
                      dueDate={item.DueDate}
                    />
                  );
                } else if (item.Caption === "Submission") {
                  return (
                    <ResultsItem
                      key={i}
                      firstname={item.firstname}
                      lastname={item.lastname}
                      profilePicture={item.profilePicture}
                      className={item.className}
                      quizName={item.QuizName}
                      score={item.score}
                      total={item.Total}
                      subDate={item.subDate}
                    />
                  );
                }
              })}
            </div>
          ) : (
            <></>
          )}

          {selectedTab == 3 ? (
            // <div className="class-items list-items">
            <div className={styles.list_items}>
              {classes.map((c) => (
                <ClassItem
                  key={c.ClassDetailsID}
                  id={c.ClassDetailsID}
                  name={c.Name}
                  firstname={c.FirstName}
                  lastname={c.LastName}
                  yearGroup={c.YearGroup}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
