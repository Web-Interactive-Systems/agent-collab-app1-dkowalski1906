import { usePath, useRoutes } from "raviger";
import { useEffect } from "react";
import Counter from "@/components/Counter";
import LayoutTheme from "./LayoutTheme";
import Home from "@/pages/Home";
import Task from "@/pages/Task";
import Member from "@/pages/Member";
import Monitoring from "@/pages/Monitoring";
import CanvasVue from "@/features/Task/CanvasVue";

const routes = {
  "/": () => <Home />,
  "/:userid/:taskid": ({ userid, taskid }) => (
    <Counter userid={userid} taskid={taskid}></Counter>
  ),
  "/task": () => <Task />,
  "/member": () => <Member />,
  "/monitoring": () => <Monitoring />,
  "/canvas": () => <CanvasVue />
};

export function Router() {
  const currentPath = usePath();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const routeResult = useRoutes(routes);

  return <LayoutTheme>{routeResult}</LayoutTheme>;
}
