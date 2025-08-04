import query from "@/constants/query-keys";
import { CourseService } from "@/services";
import { Response } from "@/types/api";
import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";

export default function CourseList() {
  const { data } = useQuery<Response<Course[]>>({
    queryKey: query.courses,
    queryFn: CourseService.getCourses,
    initialData: { data: [], message: "", meta: {} },
  });

  return (
    <div>
      {data.data.map((course, index) => {
        return <div key={index}>{course.courseName}</div>;
      })}
    </div>
  );
}
