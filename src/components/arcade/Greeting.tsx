import { useEffect, useState } from "react";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

interface GreetingProps {
  name?: string;
}

export function Greeting({ name = "Goodness" }: GreetingProps) {
  const [greeting, setGreeting] = useState(() => getGreeting(new Date().getHours()));

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting(new Date().getHours())), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-6 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-h">
          {greeting},{" "}
          <span className="bg-gradient-to-r from-accent-soft to-accent-2 bg-clip-text text-transparent">
            {name}
          </span>{" "}
          ✨
        </h1>
        <p className="mt-1 text-text-muted">Ready to play?</p>
      </div>
    </div>
  );
}