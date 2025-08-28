import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";

export default async function DashBoardPage() {

  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      <WidgetItem title="Usuario conectado Server Side" >
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
        </div>

        <div>
          {JSON.stringify(session)}
        </div>

      </WidgetItem>

    </div>
  );
}
