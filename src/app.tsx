import { useQuery } from "@tanstack/react-query";
import { CreateGoal } from "./components/create-goal";
import { EmptyGoals } from "./components/empty-goal";
import { Dialog } from "./components/ui/dialog";
import { WeeklySummary } from "./components/weekly-summary";
import { getSummary } from "./http/get-summary";
import { Loader } from "lucide-react";

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="text-zinc-500 animate-spin size-10" />
      </div>
    );
  }
  return (
    <Dialog>
      {data.summary.total > 0 ? (
        <WeeklySummary summary={data.summary} />
      ) : (
        <EmptyGoals />
      )}
      <CreateGoal />
    </Dialog>
  );
}

export default App;
