import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Divider } from "react-native-elements";

export default function HomeScreen() {
  const gradePoints = {
    "O": 10,
    "o": 10,
    "A+": 9,
    "a+": 9,
    "A": 8,
    "a": 8,
    "B+": 7,
    "b+": 7,
    "B": 6,
    "b": 6,
    "C": 5.5,
    "c": 5.5,
    "W": 0,
    "w": 0,
    "F": 0,
    "f": 0,
    "Ab": 0,
    "ab": 0,
    "I": 0,
    "i": 0,
    "*": 0,
  };

  const [courses, setCourses] = useState([
    { id: 1, courseName: "", credits: "", grade: "" },
    { id: 2, courseName: "", credits: "", grade: "" },
    { id: 3, courseName: "", credits: "", grade: "" },
    { id: 4, courseName: "", credits: "", grade: "" },
  ]);

  const [gpa, setGPA] = useState(null);

  const HandleCourse = () => {
    setCourses([
      ...courses,
      { id: courses.length + 1, courseName: "", credits: "", grade: "" },
    ]);
  };

  const calculateGPA = () => {
    let points = 0;
    let sumCredits = 0;

    courses.forEach((course) => {
      const credit = course.credits ? Number(course.credits) : 0;
      const gradept = gradePoints[course.grade] || 0;

      sumCredits += credit;
      points += credit * gradept;
    });

    const calculatedGPA = points / sumCredits;
    setGPA(calculatedGPA.toFixed(2));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCourses([
        { id: 1, courseName: "", credits: "", grade: "" },
        { id: 2, courseName: "", credits: "", grade: "" },
        { id: 3, courseName: "", credits: "", grade: "" },
        { id: 4, courseName: "", credits: "", grade: "" },
      ]);
      setGPA(null);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerContainer}>
        <Image source={require("../srm.webp")} style={styles.headimg} />
        <Text style={styles.title}>YASYAREM CGPA CALCULATOR</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.tableTitle}>
        <Text style={styles.coursetitle}>Course</Text>
        <Text style={styles.coursetitle}>Credits</Text>
        <Text style={styles.coursetitle}>Grade</Text>
      </View>
      {courses.map((course) => (
        <View key={course.id} style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.info1}>{course.id}</Text>
          </View>
          <View style={styles.col}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter"
              value={course.credits}
              onChangeText={(text) =>
                setCourses((prevCourses) =>
                  prevCourses.map((c) =>
                    c.id === course.id ? { ...c, credits: text } : c
                  )
                )
              }
            />
          </View>
          <View style={styles.col}>
            <TextInput
              style={styles.inputgrade}
              keyboardType="default"
              placeholder="Enter"
              value={course.grade}
              onChangeText={(text) =>
                setCourses((prevCourses) =>
                  prevCourses.map((c) =>
                    c.id === course.id ? { ...c, grade: text } : c
                  )
                )
              }
            />
          </View>
        </View>
      ))}
      <Divider style={styles.divider} />
      <View style={{ marginRight: 220 }}>
        <Button title="Add More Course" onPress={HandleCourse} />
      </View>
      <View style={{ marginLeft: 280, marginTop: -37 }}>
        <Button title="Calculate" onPress={calculateGPA} />
      </View>
      {gpa && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Calculated GPA: {gpa}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headimg: {
    height: 100,
    width: 100,
    marginTop: 50,
    marginLeft: 20,
  },
  title: {
    color: "white",
    marginTop: 70,
    marginLeft: 50,
    fontSize: 25,
    width: 250,
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#ffffff",
    height: 2,
    marginHorizontal: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  tableTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  coursetitle: {
    color: "white",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  col: {
    flex: 1,
    alignItems: "center",
    color: "white",
    marginRight: 50,
  },
  info1: {
    color: "white",
    marginLeft: 170,
    width: 200,
  },
  input: {
    color: "white",
    marginLeft: 220,
    width: 200,
  },
  inputgrade: {
    color: "white",
    marginLeft: 290,
    width: 200,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
