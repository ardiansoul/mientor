"use client";
import { ActionBar } from "@/components/action-bar";
import CourseList from "./CourseList";
import { ICONS } from "@/constants/icons";

export default function Courses() {
  return (
    <div className="container px-10">
      <ActionBar
        title="Courses"
        onSearch={() => console.log("searched")}
        actions={[
          {
            variant: "solid",
            children: ICONS["i-add"],
            onClick: () => console.log("showed"),
          },
        ]}
      />
      <CourseList />
    </div>
  );
}
